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
var discord_js_1 = require("discord.js");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var ms_1 = __importDefault(require("ms"));
var Interaction_1 = __importDefault(require("../extras/Interaction"));
var SlashError_1 = __importDefault(require("../extras/SlashError"));
var getFiles_1 = __importDefault(require("../utils/getFiles"));
var utils_1 = require("../utils/utils");
var CommandHandler = /** @class */ (function () {
    function CommandHandler(handler, client, dir) {
        var _this = this;
        var newDir = path_1.default.isAbsolute(dir)
            ? dir
            : path_1.default.join(require.main.path, dir);
        // Checking if the directory exists.
        if (!fs_1.default.existsSync(newDir)) {
            throw new SlashError_1.default("The commands directory: \"" + dir + "\" does not exist!");
        }
        var files = getFiles_1.default(newDir);
        var amount = files.length;
        if (amount <= 0)
            return;
        console.log("Slashcord >> Loaded " + amount + " command" + (files.length === 1 ? "" : "s") + "!");
        var _loop_1 = function (file, fileName) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var command, _a, _b, name, description, options, testOnly, category, commands, commands, _loop_2, _i, _c, server;
                var _this = this;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = require(file).default ||
                                require(file);
                            if (_a) return [3 /*break*/, 2];
                            return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(file)); })];
                        case 1:
                            _a = (_d.sent()).default;
                            _d.label = 2;
                        case 2:
                            command = _a;
                            _b = command.name, name = _b === void 0 ? fileName : _b, description = command.description, options = command.options, testOnly = command.testOnly, category = command.category;
                            if (!description) {
                                throw new SlashError_1.default("A description is required for the command: \"" + name + "\" since they are required in slash commands.");
                            }
                            if (testOnly && !handler.testServers) {
                                throw new SlashError_1.default("\n          You specified \"" + name + "\" with the \"testOnly\" feature, yet there aren't test servers!\n        ");
                            }
                            if (category) {
                                commands = handler.categories.get(category.toLowerCase());
                                if (!commands)
                                    commands = [category];
                                commands.push(name);
                                handler.categories.set(category.toLowerCase(), commands);
                            }
                            else {
                                commands = handler.categories.get("no category");
                                if (!commands)
                                    commands = ["No category"];
                                commands.push(name);
                                handler.categories.set("no category", commands);
                            }
                            if (testOnly) {
                                _loop_2 = function (server) {
                                    (function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, handler.slashCommands.create(name, description, options, server)];
                                                case 1:
                                                    _a.sent();
                                                    handler.commands.set(name, command);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })();
                                };
                                for (_i = 0, _c = handler.testServers; _i < _c.length; _i++) {
                                    server = _c[_i];
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
                                                handler.commands.set(name, command);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })();
                            }
                            return [2 /*return*/];
                    }
                });
            }); })();
        };
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var _a = files_1[_i], file = _a[0], fileName = _a[1];
            _loop_1(file, fileName);
        }
        //@ts-ignore
        client.ws.on("INTERACTION_CREATE", function (interaction) { return __awaiter(_this, void 0, void 0, function () {
            var _a, name, options, cmdName, command, cooldown, member, _b, _c, _d, _e, _f, _g, now, timeStamp, amount, timeLeft;
            var _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _a = interaction.data, name = _a.name, options = _a.options;
                        cmdName = name.toLowerCase();
                        command = handler.commands.get(cmdName);
                        if (!command)
                            return [2 /*return*/];
                        cooldown = command.cooldown;
                        member = interaction.member;
                        interaction = new Interaction_1.default(interaction, {
                            client: client,
                            member: member,
                        });
                        if (!(command.perms &&
                            !interaction.channel
                                .permissionsFor(interaction.member.user)
                                .has(command.perms, true))) return [3 /*break*/, 4];
                        _c = (_b = interaction).reply;
                        if (!((_h = handler.permissionMsg) === null || _h === void 0)) return [3 /*break*/, 1];
                        _d = void 0;
                        return [3 /*break*/, 3];
                    case 1:
                        _f = (_e = _h).replace;
                        _g = [/{PERMISSION}/g];
                        return [4 /*yield*/, utils_1.missingPermissions(interaction.member, command.perms)];
                    case 2:
                        _d = _f.apply(_e, _g.concat([_k.sent()]));
                        _k.label = 3;
                    case 3: return [2 /*return*/, _c.apply(_b, [(_d) ||
                                "You need the " + utils_1.missingPermissions(interaction.member, command.perms) + " permission to use that command."])];
                    case 4:
                        if (command.botPerms &&
                            !interaction.channel
                                .permissionsFor(interaction.guild.me)
                                .has(command.botPerms, true)) {
                            return [2 /*return*/, interaction.reply("I don't have the " + utils_1.missingPermissions(interaction.guild.me, command.botPerms) + " permission.")];
                        }
                        if (!handler.cooldowns.has(command.name)) {
                            handler.cooldowns.set(command.name, new discord_js_1.Collection());
                        }
                        now = Date.now();
                        timeStamp = handler.cooldowns.get(command.name);
                        amount = ms_1.default((cooldown === null || cooldown === void 0 ? void 0 : cooldown.toString()) || "1s");
                        if (timeStamp.has(interaction.member.user.id)) {
                            timeLeft = timeStamp.get(interaction.member.user.id) + amount;
                            if (now < timeLeft)
                                return [2 /*return*/, interaction.reply(((_j = handler.cooldownMsg) === null || _j === void 0 ? void 0 : _j.replace(/{COOLDOWN}/g, utils_1.msToTime(timeLeft - now))) ||
                                        "Slow down, you still have " + utils_1.msToTime(timeLeft - now) + " before using this again!")];
                        }
                        timeStamp.set(interaction.member.user.id, now);
                        setTimeout(function () { return timeStamp.delete(interaction.member.user.id); }, amount);
                        try {
                            command.execute({ client: client, interaction: interaction, args: options, handler: handler });
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
