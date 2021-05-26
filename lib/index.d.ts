import { Client, Collection } from "discord.js";
import SlashCmds from "./classes/SlashCommands";
import SlashcordOptions from "./extras/SlashcordOptions";
import Command from "./extras/SlashCommand";
declare class Slashcord {
    private _client;
    private _commandsDir;
    private _eventsDir;
    private _mongoURI;
    private _testServers;
    private _commandHandler;
    private _eventHandler;
    private _slashCmds;
    private _commands;
    private _categories;
    private _cooldowns;
    private _cooldownMsg;
    private _permissionsMsg;
    constructor(client: Client, options: SlashcordOptions);
    get mongoURI(): string;
    setMongoPath(mongoURI: string): Slashcord;
    get client(): Client;
    get commands(): Collection<string, Command>;
    get cooldowns(): Collection<string, any>;
    get slashCommands(): SlashCmds;
    get categories(): Collection<string, any>;
    get testServers(): string[];
    get cooldownMsg(): string;
    get permissionMsg(): string;
}
export default Slashcord;
export { Command };
//# sourceMappingURL=index.d.ts.map