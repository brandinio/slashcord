"use strict";
//@ts-nocheck
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
exports.Interaction = void 0;
const axios_1 = __importDefault(require("axios"));
const discord_js_1 = require("discord.js");
const ActionRow_1 = require("./buttons/ActionRow");
const error_1 = __importDefault(require("./extras/error"));
const utils_1 = require("./extras/utils");
class Interaction {
    constructor(interaction, extras, handler) {
        this.client = extras.client;
        this.token = interaction.token;
        this.application_id = interaction.application_id;
        this.id = interaction.id;
        this.guild = this.client.guilds.cache.get(interaction.guild_id);
        this.channel = this.guild.channels.cache.get(interaction.channel_id);
        this.member = this.guild.members.add(extras.member);
        this.handler = handler;
    }
    /**
     * Responding to an interaction, with ease.
     * @example
     */
    reply(response, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!response) {
                throw new error_1.default("Cannot send an empty message.");
            }
            let data = {
                content: response,
                flags: undefined,
                tts: undefined,
                embeds: undefined,
                components: undefined,
            };
            if (typeof response === "object") {
                const embed = new discord_js_1.MessageEmbed(response);
                data = yield this.handler.slashCmds.APIMsg(this.channel, embed);
            }
            if (utils_1.isComponent(options))
                data.components = [
                    {
                        type: 1,
                        components: [utils_1.resolveComponent(options)],
                    },
                ];
            if (options instanceof ActionRow_1.ActionRow) {
                if (!options.components)
                    throw new error_1.default("Cannot send ActionRow with no components");
                data.components = [utils_1.resolveActionRow(options)];
            }
            const isComponentArray = (i) => utils_1.isComponent(i);
            const isActionRowArray = (i) => i instanceof ActionRow_1.ActionRow;
            if (Array.isArray(options)) {
                if (options.every(isComponentArray)) {
                    data.components = [
                        {
                            type: 1,
                            components: [],
                        },
                    ];
                    if (options.length > 5)
                        throw new error_1.default("You have exceeded 5 buttons, if you want to add more than 5 use the ActionRow method as documented in the documentation");
                    options.forEach((component) => {
                        data.components[0].components.push(utils_1.resolveComponent(component));
                    });
                    return;
                }
                if (options.every(isActionRowArray)) {
                    const components = [];
                    options.forEach((actionRow) => {
                        components.push(utils_1.resolveActionRow(actionRow));
                    });
                    data.components = components;
                }
            }
            data.flags = (options === null || options === void 0 ? void 0 : options.flags) || undefined;
            data.tts = (options === null || options === void 0 ? void 0 : options.tts) || false;
            if (options === null || options === void 0 ? void 0 : options.embeds) {
                data.embeds = [options === null || options === void 0 ? void 0 : options.embeds];
            }
            //@ts-ignore
            this.client.api.interactions(this.id, this.token).callback.post({
                data: {
                    type: 4,
                    data,
                },
            });
        });
    }
    /**
     * Responding but you are thinking about what to say.
     * @example interaction.acknowledge()
     */
    acknowledge() {
        return __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            this.client.api.interactions(this.id, this.token).callback.post({
                data: {
                    type: 5,
                },
            });
        });
    }
    /**
     * Deleting our interaction response, there needs to be an existing response.
     * @example interaction.delete()
     */
    delete(options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { timeout = 0 } = options;
            if (timeout <= 0) {
                //@ts-ignore
                this.client.api
                    //@ts-ignore
                    .webhooks((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id, this.token)
                    .messages("@original")
                    .delete()
                    .catch((err) => {
                    throw new error_1.default(`Cannot delete an message: ${err}`);
                });
            }
            else {
                setTimeout(() => {
                    var _a;
                    //@ts-ignore
                    this.client.api
                        //@ts-ignore
                        .webhooks((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id, this.token)
                        .messages("@original")
                        .delete()
                        .catch((err) => {
                        throw new error_1.default(`Cannot delete an message: ${err}`);
                    });
                }, timeout);
            }
        });
    }
    /**
     * Editing an interaction with ease.
     * @example interaction.reply('wait, gimme a sec.') interaction.edit('👌')
     */
    edit(content, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!content) {
                throw new error_1.default(`Cannot send an empty message.`);
            }
            let data = {
                content,
                components: [],
            };
            if (typeof content === "object") {
                const embed = new discord_js_1.MessageEmbed(content);
                data = yield this.handler.slashCmds.APIMsg(this.channel, embed);
            }
            if (utils_1.isComponent(options))
                data.components = [
                    {
                        type: 1,
                        components: [utils_1.resolveComponent(options)],
                    },
                ];
            if (options instanceof ActionRow_1.ActionRow) {
                if (!options.components)
                    throw new error_1.default("Cannot send ActionRow with no components");
                data.components = [utils_1.resolveActionRow(options)];
            }
            const isComponentArray = (i) => utils_1.isComponent(i);
            const isActionRowArray = (i) => i instanceof ActionRow_1.ActionRow;
            if (Array.isArray(options)) {
                if (options.every(isComponentArray)) {
                    data.components = [
                        {
                            type: 1,
                            components: [],
                        },
                    ];
                    if (options.length > 5)
                        throw new error_1.default("You have exceeded 5 buttons, if you want to add more than 5 use the ActionRow method as documented in the documentation");
                    options.forEach((component) => {
                        data.components[0].components.push(utils_1.resolveComponent(component));
                    });
                    return;
                }
                if (options.every(isActionRowArray)) {
                    const components = [];
                    options.forEach((actionRow) => {
                        components.push(utils_1.resolveActionRow(actionRow));
                    });
                    data.components = components;
                }
            }
            axios_1.default.patch(`https://discord.com/api/v8/webhooks/${this.client.user.id}/${this.token}/messages/@original`, data, {
                headers: {
                    Authorization: "Bot " + this.client.token,
                    "Content-Type": "application/json",
                },
            });
        });
    }
    /**
     * Following up with another message! Cool!
     * @example await interaction.reply('Hey!') interaction.followUp('hm...')
     */
    followUp(response, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!response) {
                throw new error_1.default("Cannot send an empty message.");
            }
            let data = {
                content: response,
                components: [],
            };
            if (typeof response === "object") {
                const embed = new discord_js_1.MessageEmbed(response);
                data = yield this.handler.slashCmds.APIMsg(this.channel, embed);
            }
            if (utils_1.isComponent(options))
                data.components = [
                    {
                        type: 1,
                        components: [utils_1.resolveComponent(options)],
                    },
                ];
            if (options instanceof ActionRow_1.ActionRow) {
                if (!options.components)
                    throw new error_1.default("Cannot send ActionRow with no components");
                data.components = [utils_1.resolveActionRow(options)];
            }
            const isComponentArray = (i) => utils_1.isComponent(i);
            const isActionRowArray = (i) => i instanceof ActionRow_1.ActionRow;
            if (Array.isArray(options)) {
                if (options.every(isComponentArray)) {
                    data.components = [
                        {
                            type: 1,
                            components: [],
                        },
                    ];
                    if (options.length > 5)
                        throw new error_1.default("You have exceeded 5 buttons, if you want to add more than 5 use the ActionRow method as documented in the documentation");
                    options.forEach((component) => {
                        data.components[0].components.push(utils_1.resolveComponent(component));
                    });
                    return;
                }
                if (options.every(isActionRowArray)) {
                    const components = [];
                    options.forEach((actionRow) => {
                        components.push(utils_1.resolveActionRow(actionRow));
                    });
                    data.components = components;
                }
            }
            const shit = yield axios_1.default.post(`https://discord.com/api/v8/webhooks/${this.application_id}/${this.token}`, data, {
                headers: {
                    Authorization: "Bot " + this.client.token,
                    "Content-Type": "application/json",
                },
            });
            return shit.data;
        });
    }
    /**
     * Fetching the interaction reply, bring the message object.
     * @example interaction.reply('HMMM!!') const msg = await interaction.fetchReply();
     */
    fetchReply(messageID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (messageID) {
                const msg = yield this.channel.messages.fetch(messageID);
                return msg;
            }
            const res = yield axios_1.default.get(`https://discord.com/api/v8/webhooks/${this.application_id}/${this.token}/messages/@original`, {
                headers: {
                    Authorization: "Bot " + this.client.token,
                    "Content-Type": "application/json",
                },
            });
            const msg = (yield this.channel.messages.fetch(res.data.id));
            return msg;
        });
    }
    /**
     * Replying to the user but only they can see it!
     * @example interaction.onlyReply('Hey! Your special.')
     */
    onlyReply(response, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!response) {
                throw new error_1.default("Cannot send an empty message.");
            }
            let data = {
                content: response,
                flags: 64,
                embeds: undefined,
                tts: undefined,
            };
            if (typeof response === "object") {
                const embed = new discord_js_1.MessageEmbed(response);
                data = yield this.handler.slashCmds.APIMsg(this.channel, embed);
            }
			
			if (utils_1.isComponent(options))
                data.components = [
                    {
                        type: 1,
                        components: [utils_1.resolveComponent(options)],
                    },
                ];
            if (options instanceof ActionRow_1.ActionRow) {
                if (!options.components)
                    throw new error_1.default("Cannot send ActionRow with no components");
                data.components = [utils_1.resolveActionRow(options)];
            }
            const isComponentArray = (i) => utils_1.isComponent(i);
            const isActionRowArray = (i) => i instanceof ActionRow_1.ActionRow;
            if (Array.isArray(options)) {
                if (options.every(isComponentArray)) {
                    data.components = [
                        {
                            type: 1,
                            components: [],
                        },
                    ];
                    if (options.length > 5)
                        throw new error_1.default("You have exceeded 5 buttons, if you want to add more than 5 use the ActionRow method as documented in the documentation");
                    options.forEach((component) => {
                        data.components[0].components.push(utils_1.resolveComponent(component));
                    });
                    return;
                }
                if (options.every(isActionRowArray)) {
                    const components = [];
                    options.forEach((actionRow) => {
                        components.push(utils_1.resolveActionRow(actionRow));
                    });
                    data.components = components;
                }
            }
			
            data.flags = (options === null || options === void 0 ? void 0 : options.flags) || undefined;
            data.tts = (options === null || options === void 0 ? void 0 : options.tts) || false;
            if (options === null || options === void 0 ? void 0 : options.embeds) {
                data.embeds = [options === null || options === void 0 ? void 0 : options.embeds];
            }
            //@ts-ignore
            this.client.api.interactions(this.id, this.token).callback.post({
                data: {
                    type: 4,
                    data,
                },
            });
        });
    }
}
exports.Interaction = Interaction;
