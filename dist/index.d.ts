import { Client, Collection } from "discord.js";
import Slashcmds from "./utilities/slash";
import { ActionRow } from "./utilities/ActionRow";
import { MessageButton } from "./utilities/MessageButton";
import { Command } from "./utilities/command";
import { awaitButtons } from "./utilities/awaitButtons";
declare type SlashcordOptions = {
    useComponents?: boolean | undefined;
    testServers?: string[] | undefined;
    botOwners?: string[] | undefined;
    cooldownError?: string | undefined;
    permissionError?: string | undefined;
    devError?: string | undefined;
};
declare class Slashcord {
    static Command: typeof Command;
    static ActionRow: typeof ActionRow;
    static MessageButton: typeof MessageButton;
    static awaitButtons: typeof awaitButtons;
    private _client;
    private _commandsDir;
    private _featuresDir;
    private _testServers;
    private _botOwners;
    private _useComponents;
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
