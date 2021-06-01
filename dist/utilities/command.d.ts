import { Client, PermissionResolvable } from "discord.js";
import Slashcord from "..";
import { Interaction } from "./interaction";
interface Command {
    name: string;
    description: string;
    testOnly?: boolean;
    devOnly?: boolean;
    cooldown?: string;
    perms?: PermissionResolvable;
    execute: (client: Client, interaction: Interaction, args: any, handler: Slashcord) => any;
}
declare class Command {
    constructor({ name, description, execute, cooldown, devOnly, perms, testOnly, }: Command);
}
export { Command };
