import { Client } from "discord.js";
import SlashCmds from "./classes/SlashCommands";
import Command from "./extras/Command";
declare class Slashcord {
    private _client;
    private _commandsDir;
    private _eventsDir;
    private _mongoURI;
    private _testServers;
    private _commandHandler;
    private _eventHandler;
    private _slashCmds;
    constructor(client: Client, commandsDir?: string, eventsDir?: string, testServers?: string[]);
    get mongoURI(): string;
    setMongoPath(mongoURI?: string): Slashcord;
    get client(): Client;
    get slashCommands(): SlashCmds;
    get testServers(): string[];
}
export { Slashcord, Command };
//# sourceMappingURL=index.d.ts.map