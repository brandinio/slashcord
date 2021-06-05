import { MessageButton } from "./MessageButton";

type Component = MessageButton

class ActionRow {
    type = 1
    components: Component[] = []

    constructor(components:  Component[]){
        this.components = components
    }

    addComponent(component: Component){
        this.components.push(component)

        return this
    }
}

export { ActionRow }