import { Client, WebhookClient, GuildMember, DiscordAPIError, Guild, Channel, TextChannel } from "discord.js";
import axios from "axios";
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
  client: Client;
  type: number;
  token: string;
  member: GuildMember;
  id: string;
  guild: Guild
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
  channel: TextChannel
};

interface Interaction {
  reply(content: any, options?: Options): any;
  delete(): any;
  acknowledge(): any;
  client: Client;
  type: number;
  token: string;
  member: GuildMember
  id: string;
  guild: Guild
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
  channel: TextChannel
}

class Interaction {
  constructor(
    interaction: { type: any; token: any; id: any; channel_id: any, member: any, guild_id: string }, options: { client: Client })
    {
    this.client = options.client;
    this.token = interaction.token;
    this.id = interaction.id;
    this.guild = this.client.guilds.cache.get(interaction.guild_id)
    this.channel = this.client.channels.cache.get(interaction.channel_id)
    this.member = this.guild.members.cache.get(interaction.member.user.id)
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
      //@ts-ignore
      return this.client.api.webhooks(this.client.user?.id, this.token).messages("@original").delete()
  }

  async followUp(content: any) {
    new WebhookClient(this.client.user!.id, this.token).send(content)
  }

  async edit(content: any) {
    if (!content) {
      throw new Error(`Slashcord >> Cannot send an empty message.`)
    }
    const data = {
      content: content
    }

    axios.patch(`https://discord.com/api/v8/webhooks/${this.client.user!.id}/${this.token}/messages/@original`, data, {
      headers: {
        'Authorization': `Bot ${this.client.token}`,
        'Content-Type': 'application/json'
      }
    })
  }
}

export default Interaction;
export { InteractionOpts }
