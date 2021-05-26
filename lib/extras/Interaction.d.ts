import { Channel, Client, Guild, GuildMember } from "discord.js";
export declare enum OptionsType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8
}
declare type Options = {
    tts?: boolean;
    type?: number;
    embeds?: object[] | any;
    flags?: number;
    embed?: object[] | any;
};
declare type InteractionOpts = {
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
declare class Interaction {
    constructor(interaction: {
        type: number;
        token: string;
        id: string;
        guild_id: string;
        channel_id: string;
        application_id: string;
        member: GuildMember;
    }, options: {
        client: Client;
        member: any;
    });
    /**
     * Responding to the interaction with a message only the person who sent it can see
     * @example interaction.onlyReply("Hey you, only you can see this 😜!")
     */
    onlyReply(response: string, options?: Options): Promise<void>;
    /**
     *
     * @example await interaction.reply('Hey!') interaction.edit('hmm..')
     */
    edit(content: any): Promise<void>;
}
export default Interaction;
export { InteractionOpts };
//# sourceMappingURL=Interaction.d.ts.map