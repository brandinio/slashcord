import { Client, Collection } from "discord.js";
import Slashcmds from "./utilities/slash";
declare class Slashcord {
    private _client;
    private _commandsDir;
    private _featuresDir;
    private _testServers;
    private _botOwners;
    commands: Collection<string, any>;
    cooldowns: Collection<string, any>;
    private _slash;
    private _command;
    private _feature;
    cooldownMsg: string;
    permissionMsg: string;
    devOnlyMsg: string;
    constructor(client: Client, commandsDir: string, eventsDir: string);
    setTestServers(guildIds: string[]): Slashcord;
    setBotOwners(userIds: string[]): Slashcord;
    /**
     * Setting the cooldown error message, use {COOLDOWN} to show the cooldown.
     */
    setCooldownError(message: string): Slashcord;
    /**
     * Setting the permission error message, use {PERMISSION} to show the permissions.
     */
    setPermissionError(message: string): Slashcord;
    /**
     * Setting the developer error message.
     */
    setDevError(message: string): Slashcord;
    get client(): Client;
    get testServers(): string[];
    get botOwners(): string[];
    get slashCmds(): Slashcmds;
}
export = Slashcord;
