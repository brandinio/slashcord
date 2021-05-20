import { Channel, Client, Guild, GuildMember } from "discord.js";
declare type Options = {
    tts?: boolean;
    type?: number;
    embeds?: object;
    flags?: number;
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
declare class Interaction {
    constructor(interaction: {
        type: number;
        token: string;
        id: string;
        member: any;
        guild_id: string;
        channel_id: string;
    }, options: {
        client: Client;
    });
    edit(content: any): Promise<void>;
}
export default Interaction;
export { InteractionOpts };
//# sourceMappingURL=Interaction.d.ts.map