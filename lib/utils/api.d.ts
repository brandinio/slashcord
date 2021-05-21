import { Client } from "discord.js";
declare class SlashDiscordAPI {
    client: Client;
    constructor(client: Client);
    getMemberData(guildId: string, memberId: string): Promise<any>;
}
export { SlashDiscordAPI };
//# sourceMappingURL=api.d.ts.map