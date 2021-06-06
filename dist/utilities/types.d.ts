import { MessageButton } from "./buttons/MessageButton";
declare type Component = MessageButton;
declare type ButtonCollectorOptions = {
    time: null;
    max: number;
    errors: string[];
    maxProcessed: number;
};
export type { Component, ButtonCollectorOptions };
