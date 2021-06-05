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
  execute: (
    client: Client,
    interaction: Interaction,
    args: any,
    handler: Slashcord
  ) => any;
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
  }: Command) {
    this.name = name;
    this.description = description;
    this.execute = execute;
    this.cooldown = cooldown;
    this.devOnly = devOnly;
    this.perms = perms;
    this.testOnly = testOnly;
  }
}
// here
export { Command };

