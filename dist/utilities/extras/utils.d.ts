import { GuildMember, PermissionResolvable } from "discord.js";
declare function msToTime(ms: number): string;
declare function missingPermissions(member: GuildMember, perms: PermissionResolvable): string;
export { msToTime, missingPermissions };
