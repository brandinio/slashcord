import { Client, Collection } from "discord.js";
import Slashcmds from "./utilities/slash";
import { Command } from "./utilities/command";
declare type SlashcordOptions = {
    useButtons?: boolean | undefined;
    testServers?: string[] | undefined;
    botOwners?: string[] | undefined;
    cooldownError?: string | undefined;
    permissionError?: string | undefined;
    devError?: string | undefined;
};
declare class Slashcord {
    private _client;
    private _commandsDir;
    private _featuresDir;
    private _testServers;
    private _botOwners;
    private _useButtons;
    commands: Collection<string, Command>;
    cooldowns: Collection<string, any>;
    private _slash;
    private _command;
    cooldownMsg: string | undefined;
    permissionMsg: string | undefined;
    devOnlyMsg: string | undefined;
    constructor(client: Client, commandsDir: string, options: SlashcordOptions);
    get client(): Client;
    get testServers(): string[] | undefined;
    get botOwners(): string[] | undefined;
    get slashCmds(): Slashcmds;
}
export default Slashcord;
export { Command };
