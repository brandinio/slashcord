import { MessageButton } from "./MessageButton";
declare type Component = MessageButton;
declare class ActionRow {
    type: number;
    components: Component[];
    constructor(components: Component[]);
    addComponent(component: Component): this;
}
export { ActionRow };
