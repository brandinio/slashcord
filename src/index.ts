import { Client, Collection } from "discord.js";
import { CommandHandler } from "./handlers/CommandHandler";
import Slasherror from "./utilities/extras/error";
import Slashcmds from "./utilities/slash";

class Slashcord {
  private _client: Client;

  private _commandsDir = "./commands";
  private _featuresDir = "";

  private _testServers: string[] = [];
  private _botOwners: string[] = [];

  public commands: Collection<string, any> = new Collection();
  public cooldowns: Collection<string, any> = new Collection();

  private _slash: Slashcmds;
  private _command: CommandHandler;

  public cooldownMsg: string = "Please wait {COOLDOWN} before using that.";
  public permissionMsg: string = "You need the {PERMISSION} permission.";
  public devOnlyMsg: string = "You must a developer to use this command.";

  constructor(client: Client, commandsDir: string) {
    if (!client) {
      throw new Slasherror(
        "Please provide a Discord.js client in the first argument."
      );
    }

    this._client = client;
    this._commandsDir = commandsDir;

    if (!commandsDir) {
      console.warn(
        'Slashcord >> There was no commands directory provided, using "./commands"'
      );
    }

    this._slash = new Slashcmds(this);
    this._command = new CommandHandler(this, this._commandsDir);
  }
  public setTestServers(guildIds: string[]): Slashcord {
    this._testServers = guildIds;
    return this;
  }

  public setBotOwners(userIds: string[]): Slashcord {
    this._botOwners = userIds;
    return this;
  }

  /**
   * Setting the cooldown error message, use {COOLDOWN} to show the cooldown.
   */
  public setCooldownError(message: string): Slashcord {
    this.cooldownMsg = message;
    return this;
  }

  /**
   * Setting the permission error message, use {PERMISSION} to show the permissions.
   */
  public setPermissionError(message: string): Slashcord {
    this.permissionMsg = message;
    return this;
  }

  /**
   * Setting the developer error message.
   */
  public setDevError(message: string): Slashcord {
    this.devOnlyMsg = message;
    return this;
  }

  public get client(): Client {
    return this._client;
  }

  public get testServers() {
    return this._testServers;
  }

  public get botOwners() {
    return this._botOwners;
  }

  public get slashCmds() {
    return this._slash;
  }
}

export = Slashcord;
