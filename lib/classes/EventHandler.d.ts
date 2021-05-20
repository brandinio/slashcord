import { Client } from "discord.js";
import { Slashcord } from "..";
declare class EventHandler {
    private _events;
    private _client;
    private _handler;
    constructor(client: Client, handler: Slashcord, dir: string);
}
export = EventHandler;
//# sourceMappingURL=EventHandler.d.ts.map