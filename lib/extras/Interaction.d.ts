<<<<<<< HEAD
import { Channel, Client, Guild, GuildMember } from "discord.js";
=======
import { Client, GuildMember, Guild, Channel, TextChannel } from "discord.js";
>>>>>>> 4b53d37302ff9a45b8866c612da5350750b7136a
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
<<<<<<< HEAD
    followUp(content: any): any;
=======
>>>>>>> 4b53d37302ff9a45b8866c612da5350750b7136a
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
<<<<<<< HEAD
    channel: Channel;
};
interface Interaction {
    reply(content: any, options?: Options): Promise<void>;
    delete(): any;
    acknowledge(): any;
    followUp(content: any): any;
    fetchReply(): any;
=======
    channel: TextChannel;
};
interface Interaction {
    reply(content: any, options?: Options): any;
    delete(): any;
    acknowledge(): any;
>>>>>>> 4b53d37302ff9a45b8866c612da5350750b7136a
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
<<<<<<< HEAD
        type: number;
        token: string;
        id: string;
        member: any;
        guild_id: string;
        channel_id: string;
    }, options: {
        client: Client;
    });
=======
        type: any;
        token: any;
        id: any;
        member: any;
        guild_id: any;
        channel_id: any;
    }, options: {
        client: Client;
    });
    followUp(content: any): Promise<void>;
>>>>>>> 4b53d37302ff9a45b8866c612da5350750b7136a
    edit(content: any): Promise<void>;
}
export default Interaction;
export { InteractionOpts };
//# sourceMappingURL=Interaction.d.ts.map