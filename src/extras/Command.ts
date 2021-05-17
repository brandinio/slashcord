import { Channel, Client, Guild, GuildMember } from "discord.js";
import Interaction from "./Interaction";

type CommandOpts = {
  name: string;
  description: string;
  options: [Options];
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
  constructor({ name, execute, description, options }: CommandOpts) {
    this.name = name;
    this.description = description;
    this.options = options;
    this.execute = execute;
  }
}

export { CommandOpts }
export default Command
