import axios from "axios";
import { APIMessage, Channel, Client, RoleData } from "discord.js";
import Interaction from "../extras/Interaction";

// type RawMemberData = {
//     user: {
//         id: string,
//         username: string,
//         discriminator: string,
//         avatar?: string,
//         bot?: boolean,
//         system?: boolean,
//         mfa_enabled?: boolean,
//         locale?: string,
//         verified?: string,
//         email?: string,
//         flags?: boolean,
//         premium_type: number,
//         public_flags?: number
//     },
//     nick: string,
//     roles: RoleData[],
//     joined_at: string,
//     premium_since?: string,
//     deaf: boolean,
//     mute: boolean,
//     pending?: boolean,
//     permissions?: boolean

// }

class SlashDiscordAPI {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }
  getMemberData(guildId: string, memberId: string) {
    return axios
      .get(`https://discord.com/api/v8/guilds/${guildId}/members/${memberId}`, {
        headers: {
          Authorization: `Bot ${this.client.token}`,
        },
      })
      .then((response) => {
        return response.data;
      });
  }
  public async APIMsg(channel: Channel, content: any) {
    const { data, files } = await APIMessage.create(
      //@ts-ignore
      this.client.channels.resolve(channel.id),
      content
    )
      .resolveData()
      .resolveFiles();
    return { ...data, files };
  }
}

export { SlashDiscordAPI };
