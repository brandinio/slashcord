import { TextChannel } from "discord.js";
import { MessageButton } from "./MessageButton";

type Component = MessageButton;
type ButtonCollectorOptions = { time: null, max: number, errors: string[], maxProcessed: number }

export type {
    Component,
    ButtonCollectorOptions
}