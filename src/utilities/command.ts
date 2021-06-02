import { Client, PermissionResolvable } from "discord.js";
import Slashcord from "..";
import { Interaction } from "./interaction";

type Options = {
  name?: string;
  description?: string;
  type:
    | "SUB_COMMAND"
    | "SUB_COMMAND_GROUP"
    | "STRING"
    | "NUMBER"
    | "BOOLEAN"
    | "USER"
    | "CHANNEL"
    | "ROLE"
    | "MENTIONABLE";
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

class Command {
  constructor({
    name,
    description,
    execute,
    cooldown,
    devOnly,
    perms,
    testOnly,
    arguments: args,
  }: Command) {
    this.name = name;
    this.description = description;
    this.execute = execute;
    this.cooldown = cooldown;
    this.devOnly = devOnly;
    this.perms = perms;
    this.testOnly = testOnly;
    this.arguments = args;
  }
}
// here
export { Command };
