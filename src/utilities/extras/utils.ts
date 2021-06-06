//@ts-nocheck
import {
  GuildMember,
  GuildMemberEditData,
  PermissionResolvable,
} from "discord.js";
import { MessageButton } from "../buttons/MessageButton";
import { ActionRow } from "../buttons/ActionRow";
import Slasherror from "./error";

type Component = MessageButton;

function msToTime(ms: number) {
  let day, hour, minute, seconds;
  seconds = Math.floor(ms / 1000);
  minute = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  day = Math.floor(hour / 24);
  hour = hour % 24;
  return day
    ? hour
      ? `${day}d ${hour}h ${minute}m ${seconds}s`
      : minute
      ? `${day}d ${minute}m ${seconds}s`
      : `${day}d ${seconds}s`
    : hour
    ? `${hour}h ${minute}m ${seconds}s`
    : minute
    ? `${minute}m ${seconds}s`
    : `${seconds}s`;
}

function missingPermissions(member: GuildMember, perms: PermissionResolvable) {
  const missingPerms = member.permissions.missing(perms).map(
    (str) =>
      `\`${str
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b(\w)/g, (char) => char.toUpperCase())}\``
  );

  return missingPerms.length > 1
    ? `${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}`
    : missingPerms[0];
}

function resolveComponent(component: Component) {
  if ((component.type! = 2)) {
    if (!component.style) throw new Slasherror("No button style provided");
    if (!component.label && !component.emoji)
      throw new Slasherror("No button emoji or label was provided");
    if (component.style == 5 && !component.url)
      throw new Slasherror("Button style set to Link yet no URL provided");
    if (component.style !== 5 && !component.customId)
      throw new Slasherror("No button custom id provided");

    return {
      type: 2,
      style: component.style,
      label: component.label,
      emoji: component.emoji,
      url: component.url,
      custom_id: component.customId,
      disabled: "disabled" in component && component.disabled ? true : false,
    };
  }
}

function resolveActionRow(actionRow: ActionRow) {
  const components = [];
  actionRow.components.forEach((component) => {
    components.push(resolveComponent(component));
  });
  if (components.length == 0)
    throw new Slasherror("ActionRow cannot have no components");
  return {
    type: 1,
    components: components,
  };
}

function isEmoji(emoji: string) {
  var regex =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  return regex.test(emoji);
}

function isComponent(component) {
  return component instanceof MessageButton;
}
export {
  msToTime,
  missingPermissions,
  resolveComponent,
  isEmoji,
  resolveActionRow,
  isComponent,
};
