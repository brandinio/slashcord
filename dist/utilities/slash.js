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
const discord_js_1 = require("discord.js");
class Slashcmds {
    constructor(handler) {
        this._client = handler.client;
        this._handler = handler;
    }
    get(guildId) {
        return __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            const slash = this._client.api.applications(this._client.user.id);
            if (guildId) {
                slash.guilds(guildId);
            }
            return yield slash.commands.get();
        });
    }
    create(name, description, options = [], guildId) {
        return __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            const slash = this._client.api.applications(this._client.user.id);
            if (guildId) {
                slash.guilds(guildId);
            }
            return yield slash.commands.post({
                data: {
                    name,
                    description,
                    options,
                },
            });
        });
    }
    delete(commandId, guildId) {
        return __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            const slash = this._client.api.applications(this._client.user.id);
            if (guildId) {
                slash.guilds(guildId);
            }
            return yield slash.commands(commandId).delete();
        });
    }
    APIMsg(channel, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, files } = yield discord_js_1.APIMessage.create(
            // @ts-ignore
            this._client.channels.resolve(channel.id), content)
                .resolveData()
                .resolveFiles();
            return Object.assign(Object.assign({}, data), { files });
        });
    }
}
module.exports = Slashcmds;
