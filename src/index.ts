import { Client } from "discord.js";
import CommandHandler from "./classes/CommandHandler";
import SlashCmds from "./classes/SlashCommands";

import Command from "./extras/Command";
class Slashcord {
  private _client!: Client;
  private _commandsDir = "commands";
  private _eventsDir = "";
  private _mongoURI = "";
  private _testServers: string[] = [];

  private _commandHandler: CommandHandler;
  private _slashCmds: SlashCmds;

  constructor(
    client: Client,
    commandsDir?: string,
    eventsDir?: string,
    testServers?: string[]
  ) {
    if (!client) {
      throw new Error(
        `Slashcord >> No Discord.JS client was passed in as the first parameter!`
      );
    }

    // Redefining stuff, maybe?
    this._client = client;
    this._commandsDir = commandsDir || this._commandsDir;
    this._testServers = testServers!;

    if (!commandsDir) {
      console.warn(
        `Slashcord >> Cannot find a commands directory, using "./commands"`
      );
    }

    if (module && require.main) {
      const { path } = require.main!;
      if (path) {
        this._commandsDir = `${path}/${this._commandsDir}`;
      }

      if (this._eventsDir) {
        this._eventsDir = `${path}/${this._eventsDir}`;
      }
    }

    this._slashCmds = new SlashCmds(this, client);
    this._commandHandler = new CommandHandler(this, client, this._commandsDir);
  }

  public get mongoURI(): string {
    return this._mongoURI;
  }

  public setMongoPath(mongoURI?: string): Slashcord {
    this._mongoURI = mongoURI!;
    return this;
  }

  public get client(): Client {
    return this._client;
  }

  public get slashCommands(): SlashCmds {
    return this._slashCmds;
  }

  public get testServers(): string[] {
    return this._testServers;
  }
}

export { Slashcord, Command };
