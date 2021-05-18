import { Client } from "discord.js";
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
        send(content: any): any;
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
declare class Interaction {
    constructor(interaction: {
        type: any;
        token: any;
        id: any;
        channel_id: any;
        member: any;
    }, options: {
        client: Client;
    });
    followUp(content: any): Promise<void>;
    edit(content: any): Promise<void>;
}
export default Interaction;
export { InteractionOpts };
//# sourceMappingURL=Interaction.d.ts.map