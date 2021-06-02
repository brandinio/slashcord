import { Client, PermissionResolvable } from "discord.js";
import Slashcord from "..";
import { Interaction } from "./interaction";
declare type Options = {
    name?: string;
    description?: string;
    type: "SUB_COMMAND" | "SUB_COMMAND_GROUP" | "STRING" | "NUMBER" | "BOOLEAN" | "USER" | "CHANNEL" | "ROLE" | "MENTIONABLE";
    required?: boolean;
};
interface Command {
    name: string;
    description: string;
    testOnly?: boolean;
    devOnly?: boolean;
    cooldown?: string;
    perms?: PermissionResolvable;
    arguments?: Options[];
    execute: ({ client, interaction, args, handler, }: {
        client: Client;
        interaction: Interaction;
        args: any;
        handler: Slashcord;
    }) => any;
}
declare class Command {
    constructor({ name, description, execute, cooldown, devOnly, perms, testOnly, arguments: args, }: Command);
}
export { Command };
