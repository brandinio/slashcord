//@ts-nocheck

import axios from "axios";
import {
  Client,
  Guild,
  GuildMember,
  Message,
  MessageEmbed,
  TextChannel,
} from "discord.js";

import Slashcord from "..";
import { ActionRow } from "./ActionRow";
import Slasherror from "./extras/error";
import { isComponent, resolveActionRow, resolveComponent } from "./extras/utils";
import { Component } from "./types";
type Options = {
  tts?: boolean;
  type?: number;
  embeds?: object[] | any;
  flags?: number;
  components?: Component[],
  component?: Component,
};

interface ButtonInteraction {
  client: Client;
  customId: string;
  version: number;
  type: number;
  token: string;
  member: GuildMember | null;
  id: string;
  guild: Guild | null;
  data: [
    {
      name: string;
      id: string;
      options?: [
        {
          name: string;
          value: string;
        }
      ];
    }
  ];
  channel: TextChannel;
  message: Message;
  application_id: string;
  handler: Slashcord;
}

class ButtonInteraction {
  constructor(
    interaction: {
      type: number;
      token: string;
      id: string;
      guild_id: string;
      channel_id: string;
      application_id: string;
      member: GuildMember;
      message: Message;
      data: {
        custom_id: string;
        component_type: string;
      }
    },
    extras: { client: Client; member: any },
    handler: Slashcord
  ) {
    this.client = extras.client;
    this.token = interaction.token;
    this.application_id = interaction.application_id;
    this.id = interaction.id;

    this.guild = this.client.guilds.cache.get(interaction.guild_id)!;
    this.channel = this.guild.channels.cache.get(
      interaction.channel_id
    ) as TextChannel;
    this.message = new Message(this.client, interaction.message, this.channel)
    this.member = this.guild.members.add(extras.member);
    this.customId = interaction.data.custom_id
    this.handler = handler;
  }
  /**
   * Responding to an interaction, with ease.
   * @example
   */
  async reply(response: any, options?: Options | Component | ActionRow | Component[] | ActionRow[] | undefined) {
    if (!response) {
      throw new Slasherror("Cannot send an empty message.");
    }

    let data: any = {
      content: response,
      flags: undefined,
      tts: undefined,
      embeds: undefined,
      components: undefined,
    };

    if (typeof response === "object") {
      const embed = new MessageEmbed(response);
      data = await this.handler.slashCmds.APIMsg(this.channel, embed);
    }

    if (isComponent(options)) data.components = [
      {
        type: 1,
        components: [resolveComponent(options)]
      }
    ]

    if (options instanceof ActionRow){
      if (!options.components) throw new Slasherror('Cannot send ActionRow with no components')
      data.components = [resolveActionRow(options)]
    }

    const isComponentArray = (i: any) => isComponent(i)
    const isActionRowArray = (i: any) => i instanceof ActionRow

    if (Array.isArray(options)){
      if (options.every(isComponentArray)){
        data.components = [
          {
            type: 1,
            components: []
          }
        ]
        if (options.length > 5) throw new Slasherror('You have exceeded 5 buttons, if you want to add more than 5 use the ActionRow method as documented in the documentation')
        options.forEach(component => {
          data.components[0].components.push(resolveComponent(component))
        })
        return
      }
      if (options.every(isActionRowArray)){
        const components: any = []
        options.forEach(actionRow => {
          components.push(resolveActionRow(actionRow))
        })
        data.components = components
      }
    }

    data.flags = options?.flags || undefined;
    data.tts = options?.tts || false;
    if (options?.embeds!) {
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
   * Responding but you are thinking about what to say.
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

   async defer() {
    //@ts-ignore
    this.client.api.interactions(this.id, this.token).callback.post({
      data: {
        type: 6,
      },
    });
  }

  /**
   * Deleting our interaction response, there needs to be an existing response.
   * @example interaction.delete()
   */
  async delete(options?: { timeout?: number }) {
    const { timeout = 0 } = options!;
    if (timeout <= 0) {
      //@ts-ignore
      this.client.api
        //@ts-ignore
        .webhooks(this.client.user?.id, this.token)
        .messages("@original")
        .delete()
        .catch((err: any) => {
          throw new Slasherror(`Cannot delete an message: ${err}`);
        });
    } else {
      setTimeout(() => {
        //@ts-ignore
        this.client.api
          //@ts-ignore
          .webhooks(this.client.user?.id, this.token)
          .messages("@original")
          .delete()
          .catch((err: any) => {
            throw new Slasherror(`Cannot delete an message: ${err}`);
          });
      }, timeout);
    }
  }

  /**
   * Editing an interaction with ease.
   * @example interaction.reply('wait, gimme a sec.') interaction.edit('👌')
   */
  async edit(content: any) {
    if (!content) {
      throw new Slasherror(`Cannot send an empty message.`);
    }

    let data: any = {
      content,
      components: []
    };

    if (typeof content === "object") {
      const embed = new MessageEmbed(content);
      data = await this.handler.slashCmds.APIMsg(this.channel, embed);
    }

    if (isComponent(options)) data.components = [
      {
        type: 1,
        components: [resolveComponent(options)]
      }
    ]

    if (options instanceof ActionRow){
      if (!options.components) throw new Slasherror('Cannot send ActionRow with no components')
      data.components = [resolveActionRow(options)]
    }

    const isComponentArray = (i: any) => isComponent(i)
    const isActionRowArray = (i: any) => i instanceof ActionRow

    if (Array.isArray(options)){
      if (options.every(isComponentArray)){
        data.components = [
          {
            type: 1,
            components: []
          }
        ]
        if (options.length > 5) throw new Slasherror('You have exceeded 5 buttons, if you want to add more than 5 use the ActionRow method as documented in the documentation')
        options.forEach(component => {
          data.components[0].components.push(resolveComponent(component))
        })
        return
      }
      if (options.every(isActionRowArray)){
        const components: any = []
        options.forEach(actionRow => {
          components.push(resolveActionRow(actionRow))
        })
        data.components = components
      }
    }

    axios.patch(
      `https://discord.com/api/v8/webhooks/${this.client.user!.id}/${
        this.token
      }/messages/@original`,
      data,
      {
        headers: {
          Authorization: "Bot " + this.client.token,
          "Content-Type": "application/json",
        },
      }
    );
  }

  /**
   * Following up with another message! Cool!
   * @example await interaction.reply('Hey!') interaction.followUp('hm...')
   */
  async followUp(response: any) {
    if (!response) {
      throw new Slasherror("Cannot send an empty message.");
    }

    let data: any = {
      content: response,
      components: []
    };

    if (typeof response === "object") {
      const embed = new MessageEmbed(response);
      data = await this.handler.slashCmds.APIMsg(this.channel, embed);
    }

    if (isComponent(options)) data.components = [
      {
        type: 1,
        components: [resolveComponent(options)]
      }
    ]

    if (options instanceof ActionRow){
      if (!options.components) throw new Slasherror('Cannot send ActionRow with no components')
      data.components = [resolveActionRow(options)]
    }

    const isComponentArray = (i: any) => isComponent(i)
    const isActionRowArray = (i: any) => i instanceof ActionRow

    if (Array.isArray(options)){
      if (options.every(isComponentArray)){
        data.components = [
          {
            type: 1,
            components: []
          }
        ]
        if (options.length > 5) throw new Slasherror('You have exceeded 5 buttons, if you want to add more than 5 use the ActionRow method as documented in the documentation')
        options.forEach(component => {
          data.components[0].components.push(resolveComponent(component))
        })
        return
      }
      if (options.every(isActionRowArray)){
        const components: any = []
        options.forEach(actionRow => {
          components.push(resolveActionRow(actionRow))
        })
        data.components = components
      }
    }

    const shit = await axios.post(
      `https://discord.com/api/v8/webhooks/${this.application_id}/${this.token}`,
      data,
      {
        headers: {
          Authorization: "Bot " + this.client.token,
          "Content-Type": "application/json",
        },
      }
    );
    return shit.data;
  }

  /**
   * Fetching the interaction reply, bring the message object.
   * @example interaction.reply('HMMM!!') const msg = await interaction.fetchReply();
   */
  async fetchReply(messageID?: string) {
    if (messageID) {
      const msg = await this.channel.messages.fetch(messageID);
      return msg;
    }

    const res = await axios.get(
      `https://discord.com/api/v8/webhooks/${this.application_id}/${this.token}/messages/@original`,
      {
        headers: {
          Authorization: "Bot " + this.client.token,
          "Content-Type": "application/json",
        },
      }
    );

    const msg = (await this.channel.messages.fetch(res.data.id)) as Message;
    return msg;
  }

  /**
   * Replying to the user but only they can see it!
   * @example interaction.onlyReply('Hey! Your special.')
   */
  async onlyReply(response: any, options: Options) {
    if (!response) {
      throw new Slasherror("Cannot send an empty message.");
    }

    let data: any = {
      content: response,
      flags: 64,
      embeds: undefined,
      tts: undefined,
    };

    if (typeof response === "object") {
      const embed = new MessageEmbed(response);
      data = await this.handler.slashCmds.APIMsg(this.channel, embed);
    }

    if (data.embeds) {
      data.embeds = [options.embeds];
    }
    if (data.tts) {
      data.tts = options.tts || false;
    }

    //@ts-ignore
    this.client.api.interactions(this.id, this.token).callback.post({
      data: {
        type: 4,
        data,
      },
    });
  }
}

export { ButtonInteraction };
