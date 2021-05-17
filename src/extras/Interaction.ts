import { Client } from "discord.js";
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
    interaction: { type: any; token: any; id: any; channel_id: any }, options: { client: Client })
    {
    this.token = interaction.token;
    this.id = interaction.id;
    this.channel_id = interaction.channel_id;
    this.client = options.client;
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
}

export default Interaction;
export { InteractionOpts }