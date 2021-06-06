import { GuildMember, PermissionResolvable } from "discord.js";
import { MessageButton } from "../buttons/MessageButton";
import { ActionRow } from "../buttons/ActionRow";
declare type Component = MessageButton;
declare function msToTime(ms: number): string;
declare function missingPermissions(member: GuildMember, perms: PermissionResolvable): string;
declare function resolveComponent(component: Component): {
    type: number;
    style: number;
    label: string;
    emoji: {
        id?: string | null | undefined;
        name?: string | null | undefined;
    };
    url: string;
    custom_id: string;
    disabled: boolean;
} | undefined;
declare function resolveActionRow(actionRow: ActionRow): {
    type: number;
    components: any[];
};
declare function isEmoji(emoji: string): boolean;
declare function isComponent(component: any): boolean;
export { msToTime, missingPermissions, resolveComponent, isEmoji, resolveActionRow, isComponent, };
