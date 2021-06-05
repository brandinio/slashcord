import { Client } from "discord.js";
import Slashcord from "..";
declare class EventHandler {
    private _client;
    constructor(handler: Slashcord, client: Client, directory: string);
}
export { EventHandler };
