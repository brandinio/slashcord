import { APIMessage, Client } from "discord.js";
import Slashcord from "..";
import Interaction from "../extras/Interaction";
class SlashCmds {
  private _client: Client;
  private _handler: Slashcord;
  constructor(handler: Slashcord, client: Client) {
    this._handler = handler;
    this._client = client;
  }

  public async get(guildId?: string) {
    //@ts-ignore
    const app = this._client.api.applications(this._client.user.id);
    if (guildId) {
      app.guilds(guildId);
    }
    return await app.commands.get();
  }

  public async create(
    name: string,
    description: string,
    options: object[] = [],
    guildId?: string
  ) {
    //@ts-ignore
    const app = this._client.api.applications(this._client.user.id);
    if (guildId) {
      app.guilds(guildId);
    }

    return await app.commands.post({
      data: {
        name,
        description,
        options,
      },
    });
  }

  public async delete(commandId: string, guildId?: string) {
    //@ts-ignore
    const app = this._client.api.applications(this._client.user.id);
    if (guildId) {
      app.guilds(guildId);
    }

    return await app.commands(commandId).delete();
  }
}

export = SlashCmds;
