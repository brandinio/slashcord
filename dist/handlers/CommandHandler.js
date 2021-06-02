"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const path_1 = require("path");
const error_1 = __importDefault(require("../utilities/extras/error"));
const getFiles_1 = __importDefault(require("../utilities/getFiles"));
const interaction_1 = require("../utilities/interaction");
const ms_1 = __importDefault(require("ms"));
const utils_1 = require("../utilities/extras/utils");
class CommandHandler {
    constructor(handler, directory) {
        this._client = handler.client;
        const dir = path_1.isAbsolute(directory)
            ? directory
            : path_1.join(require.main.path, directory);
        if (!fs_1.existsSync(dir)) {
            throw new error_1.default(`The command directory: "${directory}" doesn't exist!`);
        }
        const files = getFiles_1.default(dir);
        if (files.length <= 0)
            return;
        console.log(`Slashcord >> Registered ${files.length} command${files.length === 1 ? "" : "s"}!`);
        for (const [file, fileName] of files) {
            (() => __awaiter(this, void 0, void 0, function* () {
                const command = (yield Promise.resolve().then(() => __importStar(require(file)))).default;
                const { name = fileName, description, options, testOnly, devOnly, arguments: args, } = command;
                // switch (args.type) {
                //   case "SUB":
                // }
                if (!description) {
                    throw new error_1.default(`A description is required for the command: "${name}", since it's a slash command.`);
                }
                if (testOnly && !handler.testServers.length) {
                    throw new error_1.default(`The command: "${name}" has the "testOnly" property, yet there aren't test servers specified.`);
                }
                if (devOnly && !handler.botOwners.length) {
                    throw new error_1.default(`The command: "${name}" has the "devOnly" property, yet there are no bot owners.`);
                }
                if (testOnly) {
                    for (const server of handler.testServers) {
                        yield handler.slashCmds.create(name, description, options, server);
                        handler.commands.set(name, command);
                    }
                }
                else {
                    yield handler.slashCmds.create(name, description, options);
                    handler.commands.set(name, command);
                }
            }))();
        }
        /**
         * Listening for the interactions
         */
        //@ts-ignore
        this._client.ws.on("INTERACTION_CREATE", (interaction) => {
            const { name, options: args } = interaction.data;
            const cmdName = name.toLowerCase();
            /** The extras */
            const member = interaction.member;
            const client = this._client;
            interaction = new interaction_1.Interaction(interaction, { client, member }, handler);
            const command = handler.commands.get(cmdName);
            if (!command)
                return;
            const { execute, perms, cooldown, devOnly } = command;
            if (devOnly && interaction.member.user.id !== "795336949795258378") {
                return interaction.reply(handler.devOnlyMsg);
            }
            if (!handler.cooldowns.has(command.name)) {
                handler.cooldowns.set(command.name, new discord_js_1.Collection());
            }
            if (perms &&
                !interaction.channel.permissionsFor(interaction.member).has(perms)) {
                return interaction.reply(handler.permissionMsg.replace(/{PERMISSION}/g, utils_1.missingPermissions(interaction.member, perms)));
            }
            const now = Date.now();
            const timestamp = handler.cooldowns.get(command.name);
            const amount = ms_1.default((cooldown === null || cooldown === void 0 ? void 0 : cooldown.toString()) || "1s");
            if (timestamp.has(interaction.member.user.id)) {
                const expirationTime = timestamp.get(interaction.member.user.id) + amount;
                if (now < expirationTime) {
                    return interaction.reply(handler.cooldownMsg.replace(/{COOLDOWN}/g, utils_1.msToTime(expirationTime - now)));
                }
            }
            timestamp.set(interaction.member.user.id, now);
            setTimeout(() => timestamp.delete(interaction.member.user.id), amount);
            execute({ client, interaction, args, handler });
        });
    }
}
exports.CommandHandler = CommandHandler;
