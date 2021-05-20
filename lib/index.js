"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var mongo_1 = __importDefault(require("./utils/mongo"));
var Slashcord = /** @class */ (function () {
    function Slashcord(client, commandsDir, eventsDir, testServers) {
        var _this = this;
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
        if (this._mongoURI) {
            setTimeout(function () {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, mongo_1.default(this._mongoURI)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })();
            }, 1000);
        }
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