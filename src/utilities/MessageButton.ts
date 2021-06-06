import { isEmoji } from "./extras/utils";

const styles = {
  blurple: 1,
  grey: 2,
  green: 3,
  red: 4,
  link: 5,
};

type Style = "blurple" | "grey" | "green" | "red" | "link";

type Emoji = {
  id?: string | null;
  name?: string | null;
};

class MessageButton {
  type = 2;
  style!: number;
  label!: string;
  emoji!: Emoji;
  url!: string;
  customId!: string;
  disabled: boolean = false;

  constructor(rawData: MessageButton) {
    if (!rawData) return;
    if ("style" in rawData) this.style = rawData.style;
    if ("label" in rawData) this.label = rawData.label;
    if ("emoji" in rawData) this.emoji = rawData.emoji;
    if ("url" in rawData) this.url = rawData.url;
    if ("customId" in rawData) this.customId = rawData.customId;
    if ("disabled" in rawData) this.disabled = rawData.disabled;
  }

  setStyle(style: Style) {
    //@ts-ignore
    this.style = styles[style];

    return this;
  }

  setLabel(label: string) {
    this.label = label;

    return this;
  }

  setEmoji(emoji: Emoji) {
    if (isEmoji(emoji.toString()) === true)
      this.emoji = { name: emoji.toString() };
    else if (emoji.id) this.emoji = { id: emoji.id };
    else if (emoji.toString().length > 0) this.emoji = { id: emoji.toString() };
    else this.emoji = { name: null, id: null };
    return this;
  }

  setUrl(url: string) {
    this.url = url;

    return this;
  }

  setCustomId(id: string) {
    this.customId = id;

    return this;
  }

  setDisabled(disabled: boolean) {
    this.disabled = disabled;

    return this;
  }
}

export { MessageButton };
