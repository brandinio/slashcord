import { Client, Collection } from "discord.js";
import Command from "./extras/Command";
declare class Slashcord {
    private _commandsDir;
    private _eventsDir;
    private _mongo;
    private client;
    commands: Collection<string, Record<string, any>>;
    constructor(client: Client, commandsDir?: string, eventsDir?: string);
    setMongoPath(mongoPath: string): Slashcord;
    get mongoURI(): string;
}
export { Slashcord, Command };
//# sourceMappingURL=index.d.ts.map