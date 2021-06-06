declare type Style = "blurple" | "grey" | "green" | "red" | "link";
declare type Emoji = {
    id?: string | null;
    name?: string | null;
};
declare class MessageButton {
    type: number;
    style: number;
    label: string;
    emoji: Emoji;
    url: string;
    customId: string;
    disabled: boolean;
    constructor(rawData: MessageButton);
    setStyle(style: Style): this;
    setLabel(label: string): this;
    setEmoji(emoji: Emoji): this;
    setUrl(url: string): this;
    setCustomId(id: string): this;
    setDisabled(disabled: boolean): this;
}
export { MessageButton };
