import { Client, PermissionResolvable } from "discord.js";
import Slashcord from "..";
import { Interaction } from "./interaction";
declare type Options = {
    name?: string;
    description?: string;
    type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    required?: boolean;
};
interface Command {
    name: string;
    description: string;
    testOnly?: boolean;
    devOnly?: boolean;
    cooldown?: string;
    perms?: PermissionResolvable;
    options?: Options;
    execute: ({ client, interaction, args, handler, }: {
        client: Client;
        interaction: Interaction;
        args: any;
        handler: Slashcord;
    }) => any;
}
declare class Command {
    constructor({ name, description, execute, cooldown, devOnly, perms, testOnly, options, }: Command);
}
export { Command };
