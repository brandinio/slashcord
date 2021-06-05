import { Channel } from "discord.js";
import Slashcord from "..";
declare class Slashcmds {
    private _client;
    private _handler;
    constructor(handler: Slashcord);
    get(guildId?: string): Promise<any>;
    create(name: string, description: string, options?: object[], guildId?: string): Promise<any>;
    delete(commandId: string, guildId?: string): Promise<any>;
    APIMsg(channel: Channel, content: any): Promise<{
        files: object[] | null;
    }>;
}
export = Slashcmds;
