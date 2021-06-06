import { Collector } from "discord.js";
import { ButtonInteraction } from "./ButtonInteraction";
import { ButtonCollectorOptions } from "./types";
declare class ButtonCollector extends Collector<string, ButtonInteraction> {
    constructor(message: any, filter: any, options: ButtonCollectorOptions);
    collect(button: any): any;
    empty(): void;
    endReason(): "limit" | "buttonLimit" | "userLimit" | null;
    _handleMessageDeletion(message: any): void;
    _handleChannelDeletion(channel: any): void;
    _handleGuildDeletion(guild: any): void;
}
export { ButtonCollector };
