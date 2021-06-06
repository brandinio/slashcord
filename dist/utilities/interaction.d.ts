import { Client, Guild, GuildMember, Message, TextChannel } from "discord.js";
import Slashcord from "..";
import { ActionRow } from "./buttons/ActionRow";
import { Component } from "./types";
declare type Options = {
    tts?: boolean;
    type?: number;
    embeds?: object[] | any;
    flags?: number;
    components?: Component[];
    component?: Component;
};
interface Interaction {
    client: Client;
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
    application_id: string;
    handler: Slashcord;
}
declare class Interaction {
    constructor(interaction: {
        type: number;
        token: string;
        id: string;
        guild_id: string;
        channel_id: string;
        application_id: string;
        member: GuildMember;
    }, extras: {
        client: Client;
        member: any;
    }, handler: Slashcord);
    /**
     * Responding to an interaction, with ease.
     * @example
     */
    reply(response: any, options?: Options | Component | ActionRow | Component[] | ActionRow[] | undefined): Promise<void>;
    /**
     * Responding but you are thinking about what to say.
     * @example interaction.acknowledge()
     */
    acknowledge(): Promise<void>;
    /**
     * Deleting our interaction response, there needs to be an existing response.
     * @example interaction.delete()
     */
    delete(options?: {
        timeout?: number;
    }): Promise<void>;
    /**
     * Editing an interaction with ease.
     * @example interaction.reply('wait, gimme a sec.') interaction.edit('👌')
     */
    edit(content: any, options?: Options | Component | ActionRow | Component[] | ActionRow[] | undefined): Promise<void>;
    /**
     * Following up with another message! Cool!
     * @example await interaction.reply('Hey!') interaction.followUp('hm...')
     */
    followUp(response: any, options?: Options | Component | ActionRow | Component[] | ActionRow[] | undefined): Promise<any>;
    /**
     * Fetching the interaction reply, bring the message object.
     * @example interaction.reply('HMMM!!') const msg = await interaction.fetchReply();
     */
    fetchReply(messageID?: string): Promise<Message>;
    /**
     * Replying to the user but only they can see it!
     * @example interaction.onlyReply('Hey! Your special.')
     */
    onlyReply(response: any, options: Options): Promise<void>;
}
export { Interaction };
