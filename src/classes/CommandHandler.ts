import { Client, Collection } from "discord.js";
import fs from "fs";
import path from "path";

import ms from "ms";
import Slashcord from "..";
import Command from "../extras/SlashCommand";
import Interaction from "../extras/Interaction";
import Slasherror from "../extras/SlashError";
import getFiles from "../utils/getFiles";
import { missingPermissions, msToTime } from "../utils/utils";

class CommandHandler {
  constructor(handler: Slashcord, client: Client, dir: string) {
    const newDir = path.isAbsolute(dir)
      ? dir
      : path.join(require.main!.path, dir);

    // Checking if the directory exists.
    if (!fs.existsSync(newDir)) {
      throw new Slasherror(`The commands directory: "${dir}" does not exist!`);
    }

    const files = getFiles(newDir);
    const amount = files.length;
    if (amount <= 0) return;
    console.log(
      `Slashcord >> Loaded ${amount} command${files.length === 1 ? "" : "s"}!`
    );

    for (const [file, fileName] of files) {
      (async () => {
        const command =
          require(file).default ||
          require(file) ||
          (await import(file)).default;
        const {
          name = fileName,
          description,
          options,
          testOnly,
          category,
        } = command;

        if (!description) {
          throw new Slasherror(
            `A description is required for the command: "${name}" since they are required in slash commands.`
          );
        }

        if (testOnly && !handler.testServers) {
          throw new Slasherror(`
          You specified "${name}" with the "testOnly" feature, yet there aren't test servers!
        `);
        }

        if (category) {
          let commands = handler.categories.get(category.toLowerCase());
          if (!commands) commands = [category];
          commands.push(name);
          handler.categories.set(category.toLowerCase(), commands);
        } else {
          let commands = handler.categories.get("no category");
          if (!commands) commands = ["No category"];
          commands.push(name);
          handler.categories.set("no category", commands);
        }

        if (testOnly) {
          for (const server of handler.testServers) {
            (async () => {
              await handler.slashCommands.create(
                name,
                description,
                options,
                server
              );
              handler.commands.set(name, command);
            })();
          }
        } else {
          (async () => {
            await handler.slashCommands.create(name, description, options);
            handler.commands.set(name, command);
          })();
        }
      })();
    }

    //@ts-ignore
    client.ws.on("INTERACTION_CREATE", async (interaction) => {
      const { name, options } = interaction.data;
      const cmdName = name.toLowerCase();

      const command = handler.commands.get(cmdName);
      if (!command) return;

      const { cooldown } = command;
      const member = interaction.member;
      interaction = new Interaction(interaction, {
        client,
        member,
      }) as Interaction;
      if (
        command.perms &&
        !interaction.channel
          .permissionsFor(interaction.member.user)
          .has(command.perms, true)
      ) {
        return interaction.reply(
          handler.permissionMsg?.replace(
            /{PERMISSION}/g,
            await missingPermissions(interaction.member, command.perms)
          ) ||
            `You need the ${missingPermissions(
              interaction.member,
              command.perms
            )} permission to use that command.`
        );
      }

      if (
        command.botPerms &&
        !interaction.channel
          .permissionsFor(interaction.guild.me)
          .has(command.botPerms, true)
      ) {
        return interaction.reply(
          `I don't have the ${missingPermissions(
            interaction.guild.me,
            command.botPerms
          )} permission.`
        );
      }

      if (!handler.cooldowns.has(command.name)) {
        handler.cooldowns.set(command.name, new Collection());
      }

      const now = Date.now();
      const timeStamp = handler.cooldowns.get(command.name);
      const amount = ms(cooldown?.toString() || "1s");

      if (timeStamp.has(interaction.member.user.id)) {
        const timeLeft = timeStamp.get(interaction.member.user.id) + amount;
        if (now < timeLeft)
          return interaction.reply(
            handler.cooldownMsg?.replace(
              /{COOLDOWN}/g,
              msToTime(timeLeft - now)
            ) ||
              `Slow down, you still have ${msToTime(
                timeLeft - now
              )} before using this again!`
          );
      }

      timeStamp.set(interaction.member.user.id, now);
      setTimeout(() => timeStamp.delete(interaction.member.user.id), amount);

      try {
        command!.execute({ client, interaction, args: options, handler });
      } catch (err) {
        console.log(
          `Slashcord >> Error running the command: "${command!.name}":`,
          err
        );
      }
    });
  }
}

export = CommandHandler;
