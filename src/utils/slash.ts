import { Client, Collection } from "discord.js";
import Interaction from "../extras/Interaction";

export default async (client: Client, commands: Collection<string, Record<string, any>>) => {
    client.ws.on('INTERACTION_CREATE', async (interaction: Interaction) => {
        const { name, options } = interaction.data
        const cmdName = name.toLowerCase()

        const command = commands.get(cmdName)
        if (!command) return;

        //@ts-ignore
        interaction = new Interaction(interaction, { client })
        
        try {
            await command.execute({ client, interaction, args: options })
        } catch (err) {
            console.warn(`Slashcord >> Error running the "${command.name}" command: ${err}`)
        }
    }) 
}