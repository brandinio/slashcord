import { Client, Collection } from "discord.js";
import CommandHandler from "./classes/CommandHandler";
import EventHandler from "./classes/EventHandler";
import SlashCmds from "./classes/SlashCommands";
import SlashcordOptions from "./extras/SlashcordOptions";
import Command from "./extras/SlashCommand";
import Slasherror from "./extras/SlashError";
import mongo from "./utils/mongo";

class Slashcord {
  private _client!: Client;
  private _commandsDir = "commands";
  private _eventsDir = "";
  private _mongoURI = "";
  private _testServers: string[] = [];

  private _commandHandler!: CommandHandler;
  private _eventHandler!: EventHandler;
  private _slashCmds!: SlashCmds;

  private _commands: Collection<string, Command> = new Collection();
  private _categories: Collection<string, any> = new Collection();
  private _cooldowns: Collection<string, any> = new Collection();

  constructor(client: Client, options: SlashcordOptions) {
    if (!client) {
      throw new Slasherror(
        `No Discord.JS client was passed in as the first parameter!`
      );
    }

    this._client = client;
    this._commandsDir = options.commandsDir || this._commandsDir;
    this._eventsDir = options.eventsDir || this._eventsDir;
    this._testServers = options.testServers || this._testServers;

    if (!options.commandsDir) {
      console.warn(
        `Slashcord >> Cannot find a commands directory, using "./commands"`
      );
    }
    if (options.token) {
      client.login(options.token).catch(() => {
        throw new Slasherror("You have provided a token, but it is invalid!");
      });
    }

    this._slashCmds = new SlashCmds(this, client);
    this._commandHandler = new CommandHandler(this, client, this._commandsDir);
    this._eventHandler = new EventHandler(client, this, this._eventsDir);

    if (this._mongoURI) {
      setTimeout(() => {
        (async () => {
          await mongo(this._mongoURI);
        })();
      }, 1000);
    }
  }

  public get mongoURI() {
    return this._mongoURI;
  }

  public setMongoPath(mongoURI: string): Slashcord {
    this._mongoURI = mongoURI;
    return this;
  }

  public get client(): Client {
    return this._client;
  }

  public get commands() {
    return this._commands;
  }

  public get cooldowns() {
    return this._cooldowns;
  }

  public get slashCommands(): SlashCmds {
    return this._slashCmds;
  }
  public get categories() {
    return this._categories;
  }

  public get testServers(): string[] {
    return this._testServers;
  }
}
export default Slashcord;
export { Command };
