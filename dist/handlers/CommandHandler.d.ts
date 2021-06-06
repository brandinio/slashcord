import Slashcord from "..";
declare class CommandHandler {
    private _client;
    constructor(handler: Slashcord, directory: string);
}
export { CommandHandler };
