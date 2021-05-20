<<<<<<< HEAD
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
    private _slashCmds;
    constructor(client: Client, commandsDir?: string, eventsDir?: string, testServers?: string[]);
    get mongoURI(): string;
    setMongoPath(mongoURI?: string): Slashcord;
    get client(): Client;
    get slashCommands(): SlashCmds;
    get testServers(): string[];
=======
import { Client, Collection } from "discord.js";
import Command from "./extras/Command";
declare class Slashcord {
    private _commandsDir;
    private _eventsDir;
    private _mongo;
    private client;
    commands: Collection<string, Record<string, any>>;
    constructor(client: Client, commandsDir?: string, eventsDir?: string);
    setMongoPath(mongoPath: string): Slashcord;
    get mongoURI(): string;
>>>>>>> 4b53d37302ff9a45b8866c612da5350750b7136a
}
export { Slashcord, Command };
//# sourceMappingURL=index.d.ts.map