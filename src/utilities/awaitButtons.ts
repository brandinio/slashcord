import { Collection, Message } from "discord.js";
import { ButtonCollector } from "./ButtonCollector";
import { ButtonInteraction } from "./ButtonInteraction";
import Slasherror from "./extras/error";
import { ButtonCollectorOptions } from "./types";

function awaitButtons(message: Message, filter: Function, options: ButtonCollectorOptions) {
    return new Promise<Collection<string, ButtonInteraction>>((resolve, reject) => {
        const collector = new ButtonCollector(message, filter, options)
        collector.once('end', (buttons, reason) => {
            if (options.errors && options.errors.includes(reason)) {
                reject(buttons);
            } else {
                resolve(buttons);
            }
        });
    })
}

export { awaitButtons }