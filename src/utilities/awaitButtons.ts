import { Collection, Message } from "discord.js";
import { ButtonCollector } from "./ButtonCollector";
import { ButtonInteraction } from "./ButtonInteraction";
import Slasherror from "./extras/error";

function awaitButtons(message: Message, filter: Function, options = {}) {
  return new Promise((resolve, reject) => {
    const collector = new ButtonCollector(message, filter, options);
    collector.once("end", (buttons, reason) => {
      //@ts-ignore
      if (options.errors && options.errors.includes(reason)) {
        reject(buttons);
      } else {
        resolve(buttons);
      }
    });
  });
}

export { awaitButtons };
