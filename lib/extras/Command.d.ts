import { Client } from "discord.js";
import Interaction from "./Interaction";
declare type CommandOpts = {
    name: string;
    description: string;
    options: [Options];
    testOnly?: boolean;
    execute: ({ client, interaction, args, }: {
        client: Client;
        interaction: Interaction;
        args: any;
    }) => any;
};
interface Command {
    name: string;
    description: string;
    options: [Options];
    testOnly?: boolean;
    execute: ({ client, interaction, args, }: {
        client: Client;
        interaction: Interaction;
        args: any;
    }) => any;
}
declare type Options = {
    name: string;
    description: string;
    type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    required: boolean;
};
declare class Command {
    constructor({ name, execute, description, testOnly, options }: CommandOpts);
}
export { CommandOpts };
export default Command;
//# sourceMappingURL=Command.d.ts.map