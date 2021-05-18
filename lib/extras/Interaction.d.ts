import { Client, GuildMember, Guild, TextChannel } from "discord.js";
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
    client: Client;
    type: number;
    token: string;
    member: GuildMember;
    id: string;
    guild: Guild;
    data: {
        options: [{
            name: string;
            value: string;
        }];
        name: string;
        id: string;
    };
    channel: TextChannel;
};
interface Interaction {
    reply(content: any, options?: Options): any;
    delete(): any;
    acknowledge(): any;
    client: Client;
    type: number;
    token: string;
    member: GuildMember;
    id: string;
    guild: Guild;
    data: {
        options: [{
            name: string;
            value: string;
        }];
        name: string;
        id: string;
    };
    channel: TextChannel;
}
declare class Interaction {
    constructor(interaction: {
        type: any;
        token: any;
        id: any;
        channel_id: any;
        member: any;
        guild_id: string;
    }, options: {
        client: Client;
    });
    followUp(content: any): Promise<void>;
    edit(content: any): Promise<void>;
}
export default Interaction;
export { InteractionOpts };
//# sourceMappingURL=Interaction.d.ts.map