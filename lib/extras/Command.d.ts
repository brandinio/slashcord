import { Client } from "discord.js";
import Interaction from "./Interaction";
declare type CommandOpts = {
    name: string;
    description: string;
    options: [Options];
<<<<<<< HEAD
    testOnly?: boolean;
=======
>>>>>>> 4b53d37302ff9a45b8866c612da5350750b7136a
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
<<<<<<< HEAD
    testOnly?: boolean;
=======
>>>>>>> 4b53d37302ff9a45b8866c612da5350750b7136a
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
<<<<<<< HEAD
    constructor({ name, execute, description, testOnly, options }: CommandOpts);
=======
    constructor({ name, execute, description, options }: CommandOpts);
>>>>>>> 4b53d37302ff9a45b8866c612da5350750b7136a
}
export { CommandOpts };
export default Command;
//# sourceMappingURL=Command.d.ts.map