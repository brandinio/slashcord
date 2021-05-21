"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashDiscordAPI = void 0;
var axios_1 = __importDefault(require("axios"));
// type RawMemberData = {
//     user: {
//         id: string,
//         username: string,
//         discriminator: string,
//         avatar?: string,
//         bot?: boolean,
//         system?: boolean,
//         mfa_enabled?: boolean,
//         locale?: string,
//         verified?: string,
//         email?: string,
//         flags?: boolean,
//         premium_type: number,
//         public_flags?: number
//     },
//     nick: string,
//     roles: RoleData[],
//     joined_at: string,
//     premium_since?: string,
//     deaf: boolean,
//     mute: boolean,
//     pending?: boolean,
//     permissions?: boolean
// }
var SlashDiscordAPI = /** @class */ (function () {
    function SlashDiscordAPI(client) {
        this.client = client;
    }
    SlashDiscordAPI.prototype.getMemberData = function (guildId, memberId) {
        return axios_1.default.get("https://discord.com/api/v8/guilds/" + guildId + "/members/" + memberId, {
            headers: {
                'Authorization': "Bot " + this.client.token
            }
        }).then(function (response) {
            return response.data;
        });
    };
    return SlashDiscordAPI;
}());
exports.SlashDiscordAPI = SlashDiscordAPI;
//# sourceMappingURL=api.js.map