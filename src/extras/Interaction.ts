import fetch from "node-fetch";
import {
  Channel,
  Client,
  Guild,
  GuildMember,
  Message,
  MessageEmbed,
  WebhookClient,
} from "discord.js";
import SlashCmds from "../classes/SlashCommands";
import { SlashDiscordAPI } from "../utils/api";
import Slasherror from "./SlashError";
import axios from "axios";

export enum OptionsType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
}

type Options = {
  tts?: boolean;
  type?: number;
  embeds?: object[] | any;
  flags?: number;
  embed?: object[] | any;
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
  application_id: string;
};

interface Interaction {
  reply(content: any, options?: Options): Promise<void>;
  delete(): any;
  acknowledge(): Promise<void>;
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
  application_id: string;
}

class Interaction {
  constructor(
    interaction: {
      type: number;
      token: string;
      id: string;
      guild_id: string;
      channel_id: string;
      application_id: string;
      member: GuildMember;
    },
    options: { client: Client; member: any }
  ) {
    this.client = options.client;
    this.token = interaction.token;
    this.application_id = interaction.application_id;
    this.id = interaction.id;
    this.guild = this.client.guilds.cache.get(interaction.guild_id)!;
    this.channel = this.guild.channels.cache.get(interaction.channel_id)!;
    //@ts-ignore
    this.member = this.guild.members.add(options.member);
  }
  /**
   * Responding to the interaction, with ease.
   * @example interaction.reply('Hey!')
   */
  async reply(response: any, options?: Options) {
    if (!response) {
      throw new Slasherror(`Cannot send an empty message.`);
    }
    let data = {
      content: response,
      flags: 1,
      tts: false,
      embeds: undefined,
    };

    if (typeof response === "object") {
      const shit = new MessageEmbed(response);
      //@ts-ignore
      data = await new SlashDiscordAPI(this.client).APIMsg(this.channel, shit);
    }
    data.flags = options?.flags! || 1;
    data.tts = options?.tts || false;
    if (options?.embeds!) {
      //@ts-ignore
      data.embeds = [options?.embeds];
    }

    //@ts-ignore
    this.client.api.interactions(this.id, this.token).callback.post({
      data: {
        type: options?.type || 4,
        data,
      },
    });
  }
  /**
   * Responding to the interaction with a message only the person who sent it can see
   * @example interaction.onlyReply("Hey you, only you can see this 😜!")
   */
  async onlyReply(response: string, options?: Options) {
    if (!response) {
      throw new Slasherror("Cannot send an empty message.");
    }
    let data = {
      content: response,
      flags: 1 << 6,
      tts: false,
      embeds: undefined,
    };

    if (typeof response === "object") {
      const shit = new MessageEmbed(response);
      //@ts-ignore
      data = await new SlashDiscordAPI(this.client).APIMsg(this.channel, shit);
    }

    if (options?.embeds!) {
      //@ts-ignore
      data.embeds = [options?.embeds];
    }
    //@ts-ignore
    this.client.api.interactions(this.id, this.token).callback.post({
      data: {
        type: 4,
        data,
      },
    });
  }
  /**
   * Respond but your actually thinking about how to respond.
   * NOTE: you must edit your response.
   * @example interaction.acknowledge()
   */
  async acknowledge() {
    //@ts-ignore
    this.client.api.interactions(this.id, this.token).callback.post({
      data: {
        type: 5,
      },
    });
  }

  /**
   * Deleting your response, there has to be a existing interaction.
   * @example interaction.delete()
   */
  async delete() {
    return (
      //@ts-ignore
      this.client.api
        //@ts-ignore
        .webhooks(this.client.user?.id, this.token)
        .messages("@original")
        .delete()
    );
  }

  /**
   *
   * @example await interaction.reply('Hey!') interaction.edit('hmm..')
   */
  async edit(content: any) {
    if (!content) {
      throw new Slasherror(`Slashcord >> Cannot send an empty message.`);
    }

    let data = {
      content: content,
    };

    if (typeof content === "object") {
      const shit = new MessageEmbed(content);
      //@ts-ignore
      data = await new SlashDiscordAPI(this.client).APIMsg(this.channel, shit);
    }

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

  /**
   * Following up with another message! Cool!
   * @example await interaction.reply('Hey!') interaction.followUp('hm...')
   */
  async followUp(content: any) {
    new WebhookClient(this.client.user!.id, this.token).send(content);
  }

  /**
   * Fetching the response you sent, you can react, etc.
   * @example await interaction.reply('Hmm!') const msg = await interaction.fetchReply() msg.react('😂')
   */
  async fetchReply() {
    // const res = await axios.get(
    //   `https://discord.com/api/v8/webhooks/${this.application_id}/${this.token}/messages/@original`,
    //   {
    //     headers: {
    //       Authorization: `Bot ${this.client.token}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // //@ts-ignore
    // const msg = (await this.channel.messages.fetch(res.data.id)) as Message;
    // return msg;
  }
}

export default Interaction;
export { InteractionOpts };
