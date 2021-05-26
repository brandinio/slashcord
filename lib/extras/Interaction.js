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
exports.OptionsType = void 0;
var discord_js_1 = require("discord.js");
var api_1 = require("../utils/api");
var SlashError_1 = __importDefault(require("./SlashError"));
var axios_1 = __importDefault(require("axios"));
var OptionsType;
(function (OptionsType) {
    OptionsType[OptionsType["SUB_COMMAND"] = 1] = "SUB_COMMAND";
    OptionsType[OptionsType["SUB_COMMAND_GROUP"] = 2] = "SUB_COMMAND_GROUP";
    OptionsType[OptionsType["STRING"] = 3] = "STRING";
    OptionsType[OptionsType["INTEGER"] = 4] = "INTEGER";
    OptionsType[OptionsType["BOOLEAN"] = 5] = "BOOLEAN";
    OptionsType[OptionsType["USER"] = 6] = "USER";
    OptionsType[OptionsType["CHANNEL"] = 7] = "CHANNEL";
    OptionsType[OptionsType["ROLE"] = 8] = "ROLE";
})(OptionsType = exports.OptionsType || (exports.OptionsType = {}));
var Interaction = /** @class */ (function () {
    function Interaction(interaction, options) {
        this.client = options.client;
        this.token = interaction.token;
        this.application_id = interaction.application_id;
        this.id = interaction.id;
        this.guild = this.client.guilds.cache.get(interaction.guild_id);
        this.channel = this.guild.channels.cache.get(interaction.channel_id);
        //@ts-ignore
        this.member = this.guild.members.add(options.member);
    }
    /**
     * Responding to the interaction, with ease.
     * @example interaction.reply('Hey!')
     */
    Interaction.prototype.reply = function (response, options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, shit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!response) {
                            throw new SlashError_1.default("Cannot send an empty message.");
                        }
                        data = {
                            content: response,
                            flags: 1,
                            tts: false,
                            embeds: undefined,
                        };
                        if (!(typeof response === "object")) return [3 /*break*/, 2];
                        shit = new discord_js_1.MessageEmbed(response);
                        return [4 /*yield*/, new api_1.SlashDiscordAPI(this.client).APIMsg(this.channel, shit)];
                    case 1:
                        //@ts-ignore
                        data = _a.sent();
                        _a.label = 2;
                    case 2:
                        data.flags = (options === null || options === void 0 ? void 0 : options.flags) || 1;
                        data.tts = (options === null || options === void 0 ? void 0 : options.tts) || false;
                        if (options === null || options === void 0 ? void 0 : options.embeds) {
                            //@ts-ignore
                            data.embeds = [options === null || options === void 0 ? void 0 : options.embeds];
                        }
                        //@ts-ignore
                        this.client.api.interactions(this.id, this.token).callback.post({
                            data: {
                                type: (options === null || options === void 0 ? void 0 : options.type) || 4,
                                data: data,
                            },
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Responding to the interaction with a message only the person who sent it can see
     * @example interaction.onlyReply("Hey you, only you can see this 😜!")
     */
    Interaction.prototype.onlyReply = function (response, options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, shit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!response) {
                            throw new SlashError_1.default("Cannot send an empty message.");
                        }
                        data = {
                            content: response,
                            flags: 1 << 6,
                            tts: false,
                            embeds: undefined,
                        };
                        if (!(typeof response === "object")) return [3 /*break*/, 2];
                        shit = new discord_js_1.MessageEmbed(response);
                        return [4 /*yield*/, new api_1.SlashDiscordAPI(this.client).APIMsg(this.channel, shit)];
                    case 1:
                        //@ts-ignore
                        data = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (options === null || options === void 0 ? void 0 : options.embeds) {
                            //@ts-ignore
                            data.embeds = [options === null || options === void 0 ? void 0 : options.embeds];
                        }
                        //@ts-ignore
                        this.client.api.interactions(this.id, this.token).callback.post({
                            data: {
                                type: 4,
                                data: data,
                            },
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Respond but your actually thinking about how to respond.
     * NOTE: you must edit your response.
     * @example interaction.acknowledge()
     */
    Interaction.prototype.acknowledge = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //@ts-ignore
                this.client.api.interactions(this.id, this.token).callback.post({
                    data: {
                        type: 5,
                    },
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * Deleting your response, there has to be a existing interaction.
     * @example interaction.delete()
     */
    Interaction.prototype.delete = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, (
                    //@ts-ignore
                    this.client.api
                        //@ts-ignore
                        .webhooks((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id, this.token)
                        .messages("@original")
                        .delete())];
            });
        });
    };
    /**
     *
     * @example await interaction.reply('Hey!') interaction.edit('hmm..')
     */
    Interaction.prototype.edit = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            var data, shit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!content) {
                            throw new SlashError_1.default("Slashcord >> Cannot send an empty message.");
                        }
                        data = {
                            content: content,
                        };
                        if (!(typeof content === "object")) return [3 /*break*/, 2];
                        shit = new discord_js_1.MessageEmbed(content);
                        return [4 /*yield*/, new api_1.SlashDiscordAPI(this.client).APIMsg(this.channel, shit)];
                    case 1:
                        //@ts-ignore
                        data = _a.sent();
                        _a.label = 2;
                    case 2:
                        axios_1.default.patch("https://discord.com/api/v8/webhooks/" + this.client.user.id + "/" + this.token + "/messages/@original", data, {
                            headers: {
                                Authorization: "Bot " + this.client.token,
                                "Content-Type": "application/json",
                            },
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Following up with another message! Cool!
     * @example await interaction.reply('Hey!') interaction.followUp('hm...')
     */
    Interaction.prototype.followUp = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                new discord_js_1.WebhookClient(this.client.user.id, this.token).send(content);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Fetching the response you sent, you can react, etc.
     * @example await interaction.reply('Hmm!') const msg = await interaction.fetchReply() msg.react('😂')
     */
    Interaction.prototype.fetchReply = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get("https://discord.com/api/v8/webhooks/" + this.application_id + "/" + this.token + "/messages/@original", {
                            headers: {
                                Authorization: "Bot " + this.client.token,
                                "Content-Type": "application/json",
                            },
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, this.channel.messages.fetch(res.data.id)];
                    case 2:
                        msg = (_a.sent());
                        return [2 /*return*/, msg];
                }
            });
        });
    };
    return Interaction;
}());
exports.default = Interaction;
