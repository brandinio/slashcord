import { Client, PermissionString } from "discord.js";
import Slashcord from "..";
import Interaction from "./Interaction";
declare type CommandOpts = {
    name: string;
    category?: string;
    description: string;
    options: [Options];
    testOnly?: boolean;
    cooldown?: string | number;
    perms?: PermissionString[];
    botPerms?: PermissionString[];
    execute: ({ client, interaction, args, }: {
        client: Client;
        interaction: Interaction;
        args: any;
        handler: Slashcord;
    }) => any;
};
interface Command {
    name: string;
    category?: string;
    description: string;
    options: [Options];
    cooldown?: string | number;
    testOnly?: boolean;
    perms?: PermissionString[];
    botPerms?: PermissionString[];
    execute: ({ client, interaction, args, handler, }: {
        client: Client;
        interaction: Interaction;
        args: any;
        handler: Slashcord;
    }) => any;
}
declare type Options = {
    name: string;
    description: string;
    type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    required: boolean;
    choices?: [
        {
            name: string;
            value: string;
        }
    ];
};
declare class Command {
    constructor({ name, execute, description, category, options, testOnly, cooldown, botPerms, perms, }: CommandOpts);
}
export { CommandOpts };
export default Command;
//# sourceMappingURL=SlashCommand.d.ts.map