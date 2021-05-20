"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = exports.Slashcord = void 0;
var CommandHandler_1 = __importDefault(require("./classes/CommandHandler"));
var EventHandler_1 = __importDefault(require("./classes/EventHandler"));
var SlashCommands_1 = __importDefault(require("./classes/SlashCommands"));
var Command_1 = __importDefault(require("./extras/Command"));
exports.Command = Command_1.default;
var Slashcord = /** @class */ (function () {
    function Slashcord(client, commandsDir, eventsDir, testServers) {
        this._commandsDir = "commands";
        this._eventsDir = "";
        this._mongoURI = "";
        this._testServers = [];
        if (!client) {
            throw new Error("Slashcord >> No Discord.JS client was passed in as the first parameter!");
        }
        // Redefining stuff, maybe?
        this._client = client;
        this._commandsDir = commandsDir || this._commandsDir;
        this._eventsDir = eventsDir || this._eventsDir;
        this._testServers = testServers;
        if (!commandsDir) {
            console.warn("Slashcord >> Cannot find a commands directory, using \"./commands\"");
        }
        this._slashCmds = new SlashCommands_1.default(this, client);
        this._commandHandler = new CommandHandler_1.default(this, client, this._commandsDir);
        this._eventHandler = new EventHandler_1.default(client, this, this._eventsDir);
    }
    Object.defineProperty(Slashcord.prototype, "mongoURI", {
        get: function () {
            return this._mongoURI;
        },
        enumerable: false,
        configurable: true
    });
    Slashcord.prototype.setMongoPath = function (mongoURI) {
        this._mongoURI = mongoURI;
        return this;
    };
    Object.defineProperty(Slashcord.prototype, "client", {
        get: function () {
            return this._client;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Slashcord.prototype, "slashCommands", {
        get: function () {
            return this._slashCmds;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Slashcord.prototype, "testServers", {
        get: function () {
            return this._testServers;
        },
        enumerable: false,
        configurable: true
    });
    return Slashcord;
}());
exports.Slashcord = Slashcord;
//# sourceMappingURL=index.js.map