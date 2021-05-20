<<<<<<< HEAD
import { Client } from "discord.js";
=======
import { Channel, Client, Guild, GuildMember } from "discord.js";
>>>>>>> 4b53d37302ff9a45b8866c612da5350750b7136a
import Interaction from "./Interaction";

type CommandOpts = {
  name: string;
  description: string;
  options: [Options];
<<<<<<< HEAD
  testOnly?: boolean;
=======
>>>>>>> 4b53d37302ff9a45b8866c612da5350750b7136a
  execute: ({
    client,
    interaction,
    args,
  }: {
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
  execute: ({
    client,
    interaction,
    args,
  }: {
    client: Client;
    interaction: Interaction;
    args: any;
  }) => any;
}

type Options = {
  name: string;
  description: string;
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  required: boolean;
};

class Command {
<<<<<<< HEAD
  constructor({ name, execute, description, testOnly, options }: CommandOpts) {
    this.name = name;
    this.description = description;
    this.testOnly = testOnly;
=======
  constructor({ name, execute, description, options }: CommandOpts) {
    this.name = name;
    this.description = description;
>>>>>>> 4b53d37302ff9a45b8866c612da5350750b7136a
    this.options = options;
    this.execute = execute;
  }
}

<<<<<<< HEAD
export { CommandOpts };
export default Command;
=======
export { CommandOpts }
export default Command
>>>>>>> 4b53d37302ff9a45b8866c612da5350750b7136a
