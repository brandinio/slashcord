import { Channel, Client, Guild, GuildMember, MessageEmbed } from "discord.js";
import Slashcord from "..";
import Interaction from "./Interaction";

type CommandOpts = {
  name: string;
  category?: string;
  description: string;
  options: [Options];
  testOnly?: boolean;
  cooldown?: string | number;
  execute: ({
    client,
    interaction,
    args,
  }: {
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
  execute: ({
    client,
    interaction,
    args,
    handler,
  }: {
    client: Client;
    interaction: Interaction;
    args: any;
    handler: Slashcord;
  }) => any;
}

type Options = {
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

class Command {
  constructor({
    name,
    execute,
    description,
    category,
    options,
    testOnly,
    cooldown,
  }: CommandOpts) {
    this.name = name;
    this.description = description;
    this.cooldown = cooldown;
    this.testOnly = testOnly;
    this.options = options;
    this.execute = execute;
    this.category = category;
  }
}

export { CommandOpts };
export default Command;
