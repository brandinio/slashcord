"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./extras/utils");
const styles = {
    'blurple': 1,
    'grey': 2,
    'green': 3,
    'red': 4,
    'link': 5
};
class MessageButton {
    constructor(rawData) {
        this.type = 2;
        this.disabled = false;
        if (!rawData)
            return;
        if ('style' in rawData)
            this.style = rawData.style;
        if ('label' in rawData)
            this.label = rawData.label;
        if ('emoji' in rawData)
            this.emoji = rawData.emoji;
        if ('url' in rawData)
            this.url = rawData.url;
        if ('customId' in rawData)
            this.customId = rawData.customId;
        if ('disabled' in rawData)
            this.disabled = rawData.disabled;
    }
    setStyle(style) {
        //@ts-ignore
        this.style = styles[style];
        return this;
    }
    setLabel(label) {
        this.label = label;
        return this;
    }
    setEmoji(emoji) {
        if (utils_1.isEmoji((emoji).toString()) === true)
            this.emoji = { name: (emoji).toString() };
        else if (emoji.id)
            this.emoji = { iDd: emoji.id };
        else if ((emoji).toString().length > 0)
            this.emoji = { id: (emoji).toString() };
        else
            this.emoji = { name: null, id: null };
        return this;
    }
    setUrl(url) {
        this.url = url;
        return this;
    }
    setCustomId(id) {
        this.customId = id;
        return this;
    }
    setDisabled(disabled) {
        this.disabled = disabled;
        return this;
    }
}
exports.MessageButton = MessageButton;
