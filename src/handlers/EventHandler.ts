import { Client } from "discord.js";
import { existsSync } from "fs";
import { isAbsolute, join } from "path";
import Slashcord from "..";
import Slasherror from "../utilities/extras/error";
import getFiles from "../utilities/getFiles";

class EventHandler {
  private _client: Client;
  constructor(handler: Slashcord, client: Client, directory: string) {
    this._client = handler.client;
    if (!directory) return;

    const dir = isAbsolute(directory)
      ? directory
      : join(require.main!.path, directory);

    if (!existsSync(dir)) {
      throw new Slasherror(
        `The events directory: "${directory}" doesn't exist!`
      );
    }

    const files = getFiles(dir);
    if (files.length <= 0) return;
    console.log(
      `Slashcord >> Registered ${files.length} event${
        files.length === 1 ? "" : "s"
      }!`
    );

    for (const [file, fileName] of files) {
      (async () => {
        const event = (await import(file)).default;
        if (typeof event !== "function") {
          throw new Slasherror(
            `The file: "${fileName}" needs to be a function.`
          );
        } else {
          event(client);
        }
      })();
    }
  }
}

export { EventHandler };
