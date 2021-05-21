import { Client } from "discord.js";
import { Slashcord } from "..";

import fs from "fs";
import path from "path";
import getFiles from "../utils/getFiles";
import Slasherror from "../extras/SlashError";

class EventHandler {
  private _events: Map<string, any> = new Map();
  private _client: Client;
  private _handler: Slashcord;
  constructor(client: Client, handler: Slashcord, dir: string) {
    this._client = client;
    this._handler = handler;
    if (!dir) return;

    const newDir = path.isAbsolute(dir)
      ? dir
      : path.join(require.main!.path, dir);

    if (!fs.existsSync(newDir)) {
      throw new Slasherror(`The events directory: "${dir}" does not exist!`);
    }

    const files = getFiles(newDir);
    const amount = files.length;
    if (amount === 0) return;
    console.log(
      `Slashcord >> Loaded ${amount} event${files.length === 1 ? "" : "s"}!`
    );

    (async () => {
      for (const [file, fileName] of files) {
        const event = require(file);
        if (typeof event !== "function") {
          throw new Slasherror(`The file: "${file}" is not a function!`);
        } else event(client);
      }
    })();
  }
}

export = EventHandler;
