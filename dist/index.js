"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const discord_js_1 = require("discord.js");
const CommandHandler_1 = require("./handlers/CommandHandler");
const error_1 = __importDefault(require("./utilities/extras/error"));
const slash_1 = __importDefault(require("./utilities/slash"));
const command_1 = require("./utilities/command");
Object.defineProperty(exports, "Command", { enumerable: true, get: function () { return command_1.Command; } });
class Slashcord {
    constructor(client, commandsDir, options) {
        this._commandsDir = "./commands";
        this._featuresDir = "";
        this._testServers = [];
        this._botOwners = [];
        this._useButtons = false;
        this.commands = new discord_js_1.Collection();
        this.cooldowns = new discord_js_1.Collection();
        this.cooldownMsg = "Please wait {COOLDOWN} before using that.";
        this.permissionMsg = "You need the {PERMISSION} permission.";
        this.devOnlyMsg = "You must a developer to use this command.";
        if (!client) {
            throw new error_1.default("Please provide a Discord.js client in the first argument.");
        }
        this._client = client;
        this._commandsDir = commandsDir;
        if (!commandsDir) {
            console.warn('Slashcord >> There was no commands directory provided, using "./commands"');
        }
        this._slash = new slash_1.default(this);
        this._command = new CommandHandler_1.CommandHandler(this, this._commandsDir);
        if (options) {
            if (options.botOwners)
                this._botOwners = options.botOwners;
            if (options.testServers)
                this._testServers = options.testServers;
            if (options.useButtons)
                this._useButtons = options.useButtons;
            if (options.permissionError)
                this.permissionMsg = options.permissionError;
            if (options.devError)
                this.devOnlyMsg = options.devError;
            if (options.cooldownError)
                this.cooldownMsg = options.cooldownError;
        }
    }
    get client() {
        return this._client;
    }
    get testServers() {
        return this._testServers;
    }
    get botOwners() {
        return this._botOwners;
    }
    get slashCmds() {
        return this._slash;
    }
}
exports.default = Slashcord;
