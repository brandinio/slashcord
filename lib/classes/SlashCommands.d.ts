import { Client } from "discord.js";
import Slashcord from "..";
declare class SlashCmds {
    private _client;
    private _handler;
    constructor(handler: Slashcord, client: Client);
    get(guildId?: string): Promise<any>;
    create(name: string, description: string, options?: object[], guildId?: string): Promise<any>;
    delete(commandId: string, guildId?: string): Promise<any>;
}
export = SlashCmds;
//# sourceMappingURL=SlashCommands.d.ts.map