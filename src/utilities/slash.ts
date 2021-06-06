import { APIMessage, Channel, Client } from "discord.js";
import Slashcord from "..";

class Slashcmds {
  private _client: Client;
  private _handler: Slashcord;
  constructor(handler: Slashcord) {
    this._client = handler.client;
    this._handler = handler;
  }

  public async get(guildId?: string) {
    //@ts-ignore
    const slash = this._client.api.applications(this._client.user.id);
    if (guildId) {
      slash.guilds(guildId);
    }
    return await slash.commands.get();
  }

  public async create(
    name: string,
    description: string,
    options: object[] = [],
    guildId?: string
  ) {
    //@ts-ignore
    const slash = this._client.api.applications(this._client.user.id);
    if (guildId) {
      slash.guilds(guildId);
    }

    return await slash.commands.post({
      data: {
        name,
        description,
        options,
      },
    });
  }
  public async delete(commandId: string, guildId?: string) {
    //@ts-ignore
    const slash = this._client.api.applications(this._client.user.id);
    if (guildId) {
      slash.guilds(guildId);
    }
    return await slash.commands(commandId).delete();
  }

  public async APIMsg(channel: Channel, content: any) {
    const { data, files } = await APIMessage.create(
      // @ts-ignore
      this._client.channels.resolve(channel.id),
      content
    )
      .resolveData()
      .resolveFiles();

    return { ...data, files };
  }
}

export = Slashcmds;
