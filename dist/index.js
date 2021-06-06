"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitButtons = exports.ActionRow = exports.MessageButton = exports.Command = void 0;
const discord_js_1 = require("discord.js");
const CommandHandler_1 = require("./handlers/CommandHandler");
const error_1 = __importDefault(require("./utilities/extras/error"));
const slash_1 = __importDefault(require("./utilities/slash"));
const ActionRow_1 = require("./utilities/buttons/ActionRow");
Object.defineProperty(exports, "ActionRow", { enumerable: true, get: function () { return ActionRow_1.ActionRow; } });
const MessageButton_1 = require("./utilities/buttons/MessageButton");
Object.defineProperty(exports, "MessageButton", { enumerable: true, get: function () { return MessageButton_1.MessageButton; } });
const command_1 = require("./utilities/command");
Object.defineProperty(exports, "Command", { enumerable: true, get: function () { return command_1.Command; } });
const awaitButtons_1 = require("./utilities/buttons/awaitButtons");
Object.defineProperty(exports, "awaitButtons", { enumerable: true, get: function () { return awaitButtons_1.awaitButtons; } });
class Slashcord {
    constructor(client, commandsDir, options) {
        this._commandsDir = "./commands";
        this._featuresDir = "";
        this._testServers = [];
        this._botOwners = [];
        this._useComponents = false;
        this.commands = new discord_js_1.Collection();
        this.cooldowns = new discord_js_1.Collection();
        this.cooldownMsg = "Please wait {COOLDOWN} before using that.";
        this.permissionMsg = "You need the {PERMISSION} permission.";
        this.devOnlyMsg = "You must a developer to use this command.";
        if (!client) {
            throw new error_1.default("Please provide a Discord.js client in the first argument.");
        }
        this._client = client;
        this._commandsDir = commandsDir || this._commandsDir;
        if (!commandsDir) {
            console.warn('Slashcord >> There was no commands directory provided, using "./commands"');
        }
        this._slash = new slash_1.default(this);
        this._command = new CommandHandler_1.CommandHandler(this, this._commandsDir);
        if (options && "testServers" in options)
            this._testServers = options.testServers;
        if (options && "botOwners" in options)
            this._botOwners = options.botOwners;
        if (options && "cooldownError" in options)
            this.cooldownMsg = options.cooldownError;
        if (options && "permissionError" in options)
            this.permissionMsg = options.permissionError;
        if (options && "devError" in options)
            this.devOnlyMsg = options.devError;
        if (options && "useComponents" in options)
            this._useComponents = options.useComponents;
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
Slashcord.Command = command_1.Command;
Slashcord.ActionRow = ActionRow_1.ActionRow;
Slashcord.MessageButton = MessageButton_1.MessageButton;
Slashcord.awaitButtons = awaitButtons_1.awaitButtons;
exports.default = Slashcord;
