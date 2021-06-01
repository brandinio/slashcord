import { Client, Collection } from "discord.js";
import { CommandHandler } from "./handlers/CommandHandler";
import Slasherror from "./utilities/extras/error";
import Slashcmds from "./utilities/slash";

import { Command } from "./utilities/command";
type SlashcordOptions = {
  useButtons?: boolean | undefined;
  testServers?: string[] | undefined;
  botOwners?: string[] | undefined;
  cooldownError?: string | undefined;
  permissionError?: string | undefined;
  devError?: string | undefined;
};

class Slashcord {
  private _client: Client;

  private _commandsDir = "./commands";
  private _featuresDir = "";

  private _testServers: string[] | undefined = [];
  private _botOwners: string[] | undefined = [];
  private _useButtons: boolean | undefined = false;

  public commands: Collection<string, any> = new Collection();
  public cooldowns: Collection<string, any> = new Collection();

  private _slash: Slashcmds;
  private _command: CommandHandler;

  public cooldownMsg: string | undefined =
    "Please wait {COOLDOWN} before using that.";
  public permissionMsg: string | undefined =
    "You need the {PERMISSION} permission.";
  public devOnlyMsg: string | undefined =
    "You must a developer to use this command.";

  constructor(client: Client, commandsDir: string, options: SlashcordOptions) {
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

    if (options) {
      if (options.botOwners) this._botOwners = options.botOwners;
      if (options.testServers) this._testServers = options.testServers;
      if (options.useButtons) this._useButtons = options.useButtons;
      if (options.permissionError) this.permissionMsg = options.permissionError;
      if (options.devError) this.devOnlyMsg = options.devError;
      if (options.cooldownError) this.cooldownMsg = options.cooldownError;
    }
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

export default Slashcord;
export { Command };
