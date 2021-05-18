import { Client, Collection } from "discord.js";

import { existsSync } from 'fs'
import { readdir, lstat } from 'fs/promises'
import { join, isAbsolute } from 'path'
import { Slashcord } from "../"

const EventHandler = async (
    handler: Slashcord,
    dir: string,
    client: Client,
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
           await EventHandler(handler, dir, client)
        } else {
            if (!file.endsWith(".js")) return;
            const eventModule = await require(join(itemPath))
            eventModule(client)
        }
    }
}

export { EventHandler }