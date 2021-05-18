import { Client, WebhookClient } from "discord.js";
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
  member: {
    user: {
      id: string;
      username: string;
      avatar: string;
      discriminator: string;
      public_flags: number;
    };
    roles: string[];
    premium_since: null;
    permissions: string;
    pending: boolean;
    nick: null;
    mute: boolean;
    joined_at: string;
    is_pending: boolean;
    deaf: false;
  };
  id: string;
  guild_id: string;
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
  channel_id: string;
};

interface Interaction {
  reply(content: any, options?: Options): any;
  delete(): any;
  acknowledge(): any;
  client: Client;
  type: number;
  token: string;
  member: {
    send(content: any): any
    user: {
      id: string;
      username: string;
      avatar: string;
      discriminator: string;
      public_flags: number;
    };
    roles: string[];
    premium_since: null;
    permissions: string;
    pending: boolean;
    nick: null;
    mute: boolean;
    joined_at: string;
    is_pending: boolean;
    deaf: false;
  };
  id: string;
  guild_id: string;
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
  channel_id: string;
}

class Interaction {
  constructor(
    interaction: { type: any; token: any; id: any; channel_id: any, member: any }, options: { client: Client })
    {
    this.token = interaction.token;
    this.id = interaction.id;
    this.channel_id = interaction.channel_id;
    this.client = options.client;
    this.member = interaction.member
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