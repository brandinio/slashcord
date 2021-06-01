![Logo](./src/utilities/extras/slashcord.png)

# Slashcord

📚 Easy to use slash command handler!

📌 Made for all developers!

## Installation

```bash
npm i slashcord
```

## Setup

After installing **Slashcord**, you can set up the main file like so:

```js
const { Client } = require("discord.js");
const Slashcord = require("slashcord").default;

// Defining our new client.
const client = new Client();

client.on("ready", () => {
   // Initialize Slashcord and it's arguments.
   new Slashcord(client, "commands", {
     testServers: ['id', 'id2'],
     botOwners: ['id'],
     useButtons: true  
   })
});
// Get your token
client.login("token");
```

You can always do:

```js
new Slashcord(client);
```

To simplify the work needed to use Slashcord.
You can specify `testServers` and `botOwners`, this is a handler that is **advanced** for **slash commands**.

## Creating a Command

Creating a command is pretty simple with **Slashcord**, the file name is automatically a command name. More properties are coming along the way for the command, here is a basic command:

```js
ping.js;

module.exports = {
  description: "A simple ping command.",
  testOnly: true, // Instantly registering the commands.
  execute: async ({ interaction }) => {
    interaction.reply("Pong!");
  },
};
```

The command name is `ping` so the command will be: `/ping`
We can also specify the `cooldown`, `perms`, and checking if the command will be `devOnly`.

```js
devOnly.js;

module.exports = {
  description: "A simple developer command.",
  testOnly: true, // Instantly registering the commands.
  devOnly: true,
  execute: async ({ interaction }) => {
    interaction.reply("Your a bot developer?");
  },
};
```

The `interaction` parameter is a custom version of the interaction.

#### Custom Properties:

1. `Member` - The guild member from the interaction.
2. `Channel` - The text channel from the interaction.
3. `Guild` - The guild that came from the interaction.

## Using Options

Using `options` is fairly simple, just define it in your properties when making a command.

```js
args.js

module.exports  =  {
   description: "A simple arguments command.",
   testOnly: true, // Instantly registering the commands.
   options: [{
	name: "arguments",  // Name of the arguments.
	description: "Show your arguments?",
	type: 3,
	required: true,
   }],
   execute: async ({ interaction, args }) => {
	const arguments  = args[0].value;
	interaction.reply(`Hey, you said: ${arguments}`);
   }
}
```

Let's break it down:

1. `Name` - The actual name of the argument.
2. `Description` - The description of the argument.
3. `Type` - Whether the type is a string, mention, or a number.
4. `Required` - Whether or not it's required.

## Acknowledging

Acknowledging means that the bot is thinking about what to say.
To get rid of that message you must `edit` the message.

```js
execute: async ({ interaction }) => {
  interaction.acknowledge();
};
```

And that's it! It's pretty simple.

## Editing

Editing the message is pretty simple, you can use embeds and stuff like that, similar to replying.

```js
execute: async ({ interaction }) => {
  interaction.reply("Hmm...");
  await interaction.edit("There we go!");
};
```

## Deleting

Deleting a message is the same as deleting a regular message a user/bot sends:

```js
execute: async ({ interaction }) => {
  interaction.reply("leave now!");
  interaction.delete({ timeout: 2000 }); // Must be in MS.
};
```

## Fetching

Fetching a reply would get the `Message` object from the interaction, which is pretty neat:

```js
execute: async ({ interaction }) => {
  interaction.reply("React for cookies.");
  const msg = await interaction.fetchReply();
  msg.react("🍪");
};
```

## OnlyReply

OnlyReply would just send to the user the way the `Clyde` does!

```js
execute: async ({ interaction }) => {
  interaction.onlyReply("You can only see this!");
};
```

# Creating a Event

Making a `event` is pretty simple, just pass in a `client` parameter in your `module.exports` and do whatever you want!

```js
module.exports = (client) => {
  // Do whatever you want here :)
};
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Special Thanks

Mawlicous
Mystic
KrabbyBucketz
