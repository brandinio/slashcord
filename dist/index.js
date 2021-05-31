"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = require("discord.js");
const CommandHandler_1 = require("./handlers/CommandHandler");
const EventHandler_1 = require("./handlers/EventHandler");
const error_1 = __importDefault(require("./utilities/extras/error"));
const slash_1 = __importDefault(require("./utilities/slash"));
class Slashcord {
    constructor(client, commandsDir, eventsDir) {
        this._commandsDir = "./commands";
        this._featuresDir = "";
        this._testServers = [];
        this._botOwners = [];
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
        this._featuresDir = eventsDir;
        if (!commandsDir) {
            console.warn('Slashcord >> There was no commands directory provided, using "./commands"');
        }
        this._slash = new slash_1.default(this);
        this._command = new CommandHandler_1.CommandHandler(this, this._commandsDir);
        this._feature = new EventHandler_1.EventHandler(this, client, this._featuresDir);
    }
    setTestServers(guildIds) {
        this._testServers = guildIds;
        return this;
    }
    setBotOwners(userIds) {
        this._botOwners = userIds;
        return this;
    }
    /**
     * Setting the cooldown error message, use {COOLDOWN} to show the cooldown.
     */
    setCooldownError(message) {
        this.cooldownMsg = message;
        return this;
    }
    /**
     * Setting the permission error message, use {PERMISSION} to show the permissions.
     */
    setPermissionError(message) {
        this.permissionMsg = message;
        return this;
    }
    /**
     * Setting the developer error message.
     */
    setDevError(message) {
        this.devOnlyMsg = message;
        return this;
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
module.exports = Slashcord;
