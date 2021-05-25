import { MessageEmbed } from "discord.js";
const Command = require("../extras/SlashCommand");
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default new Command({
  name: "help",
  description: "Displays all of the commands!",
  category: "Misc",
  cooldown: "5s",
  execute: async ({ interaction, args, handler }: any) => {
    const embed = new MessageEmbed()
      .setColor("#2f3136")
      .setTimestamp()
      .setTitle(`${interaction.client.user?.username}'s Commands`)
      .setThumbnail(interaction.client.user?.displayAvatarURL()!);
    if (!args) {
      let totalCmds = 0;
      handler.categories.forEach((category: string[]) => {
        let results: string[] = [];

        category.slice(1).forEach((cmd: string) => {
          results.push(cmd);
          totalCmds++;
        });
        embed.addField(
          `${category[0]} \`${results.length}\``,
          `\`${results.join("` `")}\``
        );
        embed.setDescription(
          `> Remember to do \`/\` before every command!\n> To get command info: \`/help [command]\`\n\n> ❯ \\🤖 Commands: **\`${handler.commands.size}\`**\n> ❯ \\📌 Categories: **\`${handler.categories.size}\`**`
        );
      });

      interaction.reply(embed);
    } else {
      const command = handler.commands.get(args[0].value);
      if (!command) {
        return interaction.reply(
          `\\❌ The command: \`${args[0].value}\` doesn't exist!`
        );
      }
      const newEmbed = new MessageEmbed()
        .setTimestamp()
        .setColor("#2f3136")
        .setThumbnail(interaction.client.user?.displayAvatarURL()!)
        .setTitle(`${capitalizeFirstLetter(command.name)}'s Info`)
        .setDescription(`${command.description}`)
        .addFields(
          {
            name: "Cooldown",
            value: `\`${command.cooldown || `1s`}\``,
          },
          {
            name: "Category",
            value: `\`${command.category}\``,
          }
        );
      interaction.reply(newEmbed);
    }
  },
});
