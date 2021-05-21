import axios from "axios";
import {
  Channel,
  Client,
  Guild,
  GuildMember,
  MessageEmbed,
  WebhookClient,
} from "discord.js";
import { SlashDiscordAPI } from "../utils/api";

type Options = {
  tts?: boolean;
  type?: number;
  embeds?: object;
  flags?: number;
};

type InteractionOpts = {
  reply(content: any, options?: Options): any;
  delete(): any;
  acknowledge(): any;
  followUp(content: any): any;
  client: Client;
  type: number;
  token: string;
  member: GuildMember;
  id: string;
  guild: Guild;
  data: {
    options: [
      {
        name: string;
        value: string;
      }
    ];
    name: string;
    id: string;
  };
  channel: Channel;
};

interface Interaction {
  reply(content: any, options?: Options): Promise<void>;
  delete(): any;
  acknowledge(): any;
  followUp(content: any): any;
  fetchReply(): any;
  client: Client;
  type: number;
  token: string;
  member: GuildMember;
  id: string;
  guild: Guild;
  data: {
    options: [
      {
        name: string;
        value: string;
      }
    ];
    name: string;
    id: string;
  };
  channel: Channel;
}

class Interaction {
  constructor(
    interaction: {
      type: number;
      token: string;
      id: string;
      member: any;
      guild_id: string;
      channel_id: string;
    },
    options: { client: Client }
  ) {
    this.client = options.client;
    this.token = interaction.token;
    this.id = interaction.id;
    this.guild = this.client.guilds.cache.get(interaction.guild_id)!;
    this.channel = this.guild.channels.cache.get(interaction.channel_id)!;
  }
  async reply(response: any, options?: Options) {
    if (!response) {
      throw new Error(`Slashcord >> Cannot send an empty message.`);
    }

    let data = {
      content: response,
    };

    //@ts-ignore
    this.client.api.interactions(this.id, this.token).callback.post({
      data: {
        type: options?.type ?? 4,
        embeds: [options?.embeds] ?? [],
        flags: options?.flags ?? 4,
        data,
        tts: options?.tts ?? false,
      },
    });
  }
  async acknowledge() {
    //@ts-ignore
    this.client.api.interactions(this.id, this.token).callback.post({
      data: {
        type: 5,
      },
    });
  }

  async delete() {
    return (
      this.client.api
        //@ts-ignore
        .webhooks(this.client.user?.id, this.token)
        .messages("@original")
        .delete()
    );
  }

  async edit(content: any) {
    if (!content) {
      throw new Error(`Slashcord >> Cannot send an empty message.`);
    }

    const data = {
      content: content,
    };

    axios.patch(
      `https://discord.com/api/v8/webhooks/${this.client.user!.id}/${
        this.token
      }/messages/@original`,
      data,
      {
        headers: {
          Authorization: `Bot ${this.client.token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  async followUp(content: any) {
    new WebhookClient(this.client.user!.id, this.token).send(content);
  }

  async fetchReply() {
    //@ts-ignore
    const msg = await this.channel.messages.fetch(this.id);
    console.log(msg);
  }
}

export default Interaction;
export { InteractionOpts };
