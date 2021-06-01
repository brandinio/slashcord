import { Client, Collection } from "discord.js";
import { existsSync } from "fs";
import { isAbsolute, join } from "path";
import Slashcord from "..";
import Slasherror from "../utilities/extras/error";
import getFiles from "../utilities/getFiles";
import { Interaction } from "../utilities/interaction";

import ms from "ms";
import { msToTime, missingPermissions } from "../utilities/extras/utils";

class CommandHandler {
  private _client: Client;
  constructor(handler: Slashcord, directory: string) {
    this._client = handler.client;

    const dir = isAbsolute(directory)
      ? directory
      : join(require.main!.path, directory);
    if (!existsSync(dir)) {
      throw new Slasherror(
        `The command directory: "${directory}" doesn't exist!`
      );
    }

    const files = getFiles(dir);
    if (files.length <= 0) return;
    console.log(
      `Slashcord >> Registered ${files.length} command${
        files.length === 1 ? "" : "s"
      }!`
    );

    for (const [file, fileName] of files) {
      (async () => {
        const command = (await import(file)).default;
        const {
          name = fileName,
          description,
          options,
          testOnly,
          devOnly,
        } = command;
        if (!description) {
          throw new Slasherror(
            `A description is required for the command: "${name}", since it's a slash command.`
          );
        }

        if (testOnly && !handler.testServers!.length) {
          throw new Slasherror(
            `The command: "${name}" has the "testOnly" property, yet there aren't test servers specified.`
          );
        }

        if (devOnly && !handler.botOwners!.length) {
          throw new Slasherror(
            `The command: "${name}" has the "devOnly" property, yet there are no bot owners.`
          );
        }

        if (testOnly) {
          for (const server of handler.testServers!) {
            await handler.slashCmds.create(name, description, options, server);
            handler.commands.set(name, command);
          }
        } else {
          await handler.slashCmds.create(name, description, options);
          handler.commands.set(name, command);
        }
      })();
    }

    /**
     * Listening for the interactions
     */
    //@ts-ignore
    this._client.ws.on("INTERACTION_CREATE", (interaction) => {
      const { name, options: args } = interaction.data;
      const cmdName = name.toLowerCase();

      /** The extras */
      const member = interaction.member;
      const client = this._client;

      interaction = new Interaction(
        interaction,
        { client, member },
        handler
      ) as Interaction;
      const command = handler.commands.get(cmdName);
      if (!command) return;
      const { execute, perms, cooldown, devOnly } = command;

      if (devOnly && interaction.member.user.id !== "795336949795258378") {
        return interaction.reply(handler.devOnlyMsg);
      }

      if (!handler.cooldowns.has(command.name)) {
        handler.cooldowns.set(command.name, new Collection());
      }

      if (
        perms &&
        !interaction.channel.permissionsFor(interaction.member).has(perms)
      ) {
        return interaction.reply(
          handler.permissionMsg!.replace(
            /{PERMISSION}/g,
            missingPermissions(interaction.member, perms)
          )
        );
      }

      const now = Date.now();
      const timestamp = handler.cooldowns.get(command.name);
      const amount: any = ms(cooldown?.toString() || "1s");

      if (timestamp.has(interaction.member.user.id)) {
        const expirationTime =
          timestamp.get(interaction.member.user.id) + amount;
        if (now < expirationTime) {
          return interaction.reply(
            handler.cooldownMsg!.replace(
              /{COOLDOWN}/g,
              msToTime(expirationTime - now)
            )
          );
        }
      }

      timestamp.set(interaction.member.user.id, now);
      setTimeout(() => timestamp.delete(interaction.member.user.id), amount);

      execute({ client, interaction, args, handler });
    });
  }
}

export { CommandHandler };
