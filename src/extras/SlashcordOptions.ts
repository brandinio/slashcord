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
   * Configure the error messages.
   * @example new Slashcord(client, { commandsDir: "./commands", customMsgs: { cooldownMsg: "Wait {COOLDOWN} before using it again."}})
   */
  customMsgs?: {
    /**
     * To put the actual cooldown, make sure to put {COOLDOWN} in your message.
     * @example cooldownMsg: "Wait {COOLDOWN}, aight."
     */
    cooldownMsg: string;
    /**
     * To put the permissions missing, make sure to put {PERMISSION} in your message.
     * @example permissionMsg: "I need the {PERMISSION} permission, you know."
     */
    permissionMsg: string;
  };
}
export = SlashcordOptions;
