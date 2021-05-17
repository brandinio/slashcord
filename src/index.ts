import { Client, Collection } from "discord.js";
import { EventEmitter } from "events";
import { CommandHandler } from "./handlers/CommandHandler";
import mongo from "./utils/mongo";
import Command from "./extras/Command";
import slash from "./utils/slash";
class Slashcord {
  private _commandsDir = "./commands";
  private _eventsDir = "";
  private _testServers: string[] = [];
  private _mongo = "";
  private client!: Client;
  public commands: Collection<string, Record<string, any>> = new Collection();

  constructor(client: Client, commandsDir?: string, eventsDir?: string) {
    if (!client) {
      throw new Error(
        `Slashcord >> No Discord client was passed in as the first argument!`
      );
    }

    if (!commandsDir) {
      (async () => {
        console.warn(
          `Slashcord >> No commands directory was specified. Using "./commands"`
        );
        this._commandsDir = commandsDir || this._commandsDir;
        await CommandHandler(this, this._commandsDir, client, this.commands);
        await slash(client, this.commands);
      })();
    } else {
      (async () => {
        await CommandHandler(this, commandsDir, client, this.commands);
        await slash(client, this.commands);
      })();
    }

    if (eventsDir) {
      this._eventsDir = eventsDir;
      // Do stuff with the event handler
    }

    setTimeout(async () => {
      if (this._mongo) {
        await mongo(this._mongo);
      }
    }, 1000);
  }

  public setMongoPath(mongoPath: string): Slashcord {
    this._mongo = mongoPath;
    return this;
  }
}

export { Slashcord, Command };
