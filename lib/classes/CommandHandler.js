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
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Interaction_1 = __importDefault(require("../extras/Interaction"));
var SlashError_1 = __importDefault(require("../extras/SlashError"));
var getFiles_1 = __importDefault(require("../utils/getFiles"));
var CommandHandler = /** @class */ (function () {
    function CommandHandler(handler, client, dir) {
        var _this = this;
        this.commands = new Map();
        var newDir = path_1.default.isAbsolute(dir)
            ? dir
            : path_1.default.join(require.main.path, dir);
        // Checking if the directory exists.
        if (!fs_1.default.existsSync(newDir)) {
            throw new SlashError_1.default("The commands directory: \"" + dir + "\" does not exist!");
        }
        var files = getFiles_1.default(newDir);
        var amount = files.length;
        if (amount < 0)
            return;
        console.log("Slashcord >> Loaded " + amount + " command" + (files.length === 1 ? "" : "s") + "!");
        var _loop_1 = function (file, fileName) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var command, _a, name, description, options, testOnly, _loop_2, _i, _b, server;
                var _this = this;
                return __generator(this, function (_c) {
                    command = require(file).default || require(file);
                    _a = command.name, name = _a === void 0 ? fileName : _a, description = command.description, options = command.options, testOnly = command.testOnly;
                    if (!command)
                        if (!description) {
                            throw new SlashError_1.default("A description is required for the command: \"" + name + "\" since they are required in slash commands.");
                        }
                    if (testOnly && !handler.testServers) {
                        throw new SlashError_1.default("\n          You specified \"" + name + "\" with the \"testOnly\" feature, yet there aren't test servers!\n        ");
                    }
                    if (testOnly) {
                        _loop_2 = function (server) {
                            (function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, handler.slashCommands.create(name, description, options, server)];
                                        case 1:
                                            _a.sent();
                                            this.commands.set(name, command);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })();
                        };
                        for (_i = 0, _b = handler.testServers; _i < _b.length; _i++) {
                            server = _b[_i];
                            _loop_2(server);
                        }
                    }
                    else {
                        (function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, handler.slashCommands.create(name, description, options)];
                                    case 1:
                                        _a.sent();
                                        this.commands.set(name, command);
                                        return [2 /*return*/];
                                }
                            });
                        }); })();
                    }
                    return [2 /*return*/];
                });
            }); })();
        };
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var _a = files_1[_i], file = _a[0], fileName = _a[1];
            _loop_1(file, fileName);
        }
        //@ts-ignore
        client.ws.on("INTERACTION_CREATE", function (interaction) { return __awaiter(_this, void 0, void 0, function () {
            var _a, name, options, cmdName, command, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = interaction.data, name = _a.name, options = _a.options;
                        cmdName = name.toLowerCase();
                        command = this.commands.get(cmdName);
                        if (!command)
                            return [2 /*return*/];
                        _b = Interaction_1.default.bind;
                        return [4 /*yield*/, interaction];
                    case 1:
                        interaction = new (_b.apply(Interaction_1.default, [void 0, _c.sent(), { client: client }]))();
                        try {
                            command.execute({ client: client, interaction: interaction, args: options });
                        }
                        catch (err) {
                            console.log("Slashcord >> Error running the command: \"" + command.name + "\":", err);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    }
    return CommandHandler;
}());
module.exports = CommandHandler;
//# sourceMappingURL=CommandHandler.js.map