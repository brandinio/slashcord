import { Collection, Message } from "discord.js";
import { ButtonInteraction } from "./ButtonInteraction";
import { ButtonCollectorOptions } from "../types";
declare function awaitButtons(message: Message, filter: Function, options: ButtonCollectorOptions): Promise<Collection<string, ButtonInteraction>>;
export { awaitButtons };
