import { Client, Collection } from "discord.js";

import { existsSync } from 'fs'
import { readdir, lstat } from 'fs/promises'
import { join, isAbsolute } from 'path'
import { Slashcord } from "../"

const CommandHandler = async (
    handler: Slashcord,
    dir: string,
    client: Client,
    commands: Collection<string, Record<string, any>>
) => {
    const path = isAbsolute(dir) ? dir : join(require.main!.path, dir)

    if (!existsSync(path)) {
        console.warn(`Slashcord >> Cannot find directory "${dir}", please create one.`)
        return;
    }

    const files = await readdir(path)
    for (const file of files) {
        const itemPath = join(path, file)
        const stat = await lstat(itemPath)

        if (stat.isDirectory()) {
           await CommandHandler(handler, dir, client, commands)
        } else {
            if (!file.endsWith(".js")) return;
            let module = require(join(itemPath))
            const { name, description, options } = module
            if (!name) {
                console.warn(`The file: "${file}" doesn't have a name, which is required for slash commands!`)
                continue;
            }

            commands.set(name, module)
            console.log(`Slashcord >> Loaded the command: "${name}"`)
            //@ts-ignore
            await client.api.applications(client.user.id).commands.post({
                data: {
                    name: name,
                    description: description,
                    options: options
                }
            })
        }
    }
}

export { CommandHandler }