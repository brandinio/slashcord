interface SlashcordOptions {
    /**
     * The commands directory For This Client
     */
    commandsDir?: string;
    /**
     * The events directory For This Client
     */
    eventsDir?: string;
    /**
     * The test servers For This Client
     */
    testServers?: string[];
    /**
     * Providing a token logs in for you, saves time.
     */
    token?: string;
    /**
     * Here you can configure default commands.
     */
    defaultCommands?: {
        testOnly?: boolean;
        ping?: boolean;
        help?: boolean;
    };
}
export = SlashcordOptions;
//# sourceMappingURL=SlashcordOptions.d.ts.map