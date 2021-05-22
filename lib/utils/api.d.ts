import { Channel, Client } from "discord.js";
declare class SlashDiscordAPI {
    client: Client;
    constructor(client: Client);
    getMemberData(guildId: string, memberId: string): Promise<any>;
    APIMsg(channel: Channel, content: any): Promise<{
        files: object[] | null;
    }>;
}
export { SlashDiscordAPI };
//# sourceMappingURL=api.d.ts.map