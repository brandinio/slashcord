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
    testServers: ["id", "id2"],
    botOwners: ["id"],
  });
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

# Components!

To offer ease of use and good readability, components can be sent in many ways!
`Note that currently there is only 1 component which is buttons`

## Sending a single component

To send 1 component, simply pass it as the second argument in `reply`, `edit`, or `followUp`

```js
const Slashcord = require("slashcord").default;

const button = new Slashcord.MessageButton()
  .setCustomId("example_button")
  .setStyle("red")
  .setLabel("An Example");

interaction.reply("some text", button);
```

## Sending multiple components

To send multiple components easily just put them all in an array and of course pass it as the second argument

```js
const Slashcord = require("slashcord").default;

const button = new Slashcord.MessageButton()
  .setCustomId("example_button")
  .setStyle("red")
  .setLabel("An Example");

const button = new Slashcord.MessageButton()
  .setCustomId("example_button_2")
  .setStyle("green")
  .setLabel("An Example 2");

interaction.reply("some text", [button, button2]);
```

However, with this use you are limited to only 5 components because of Discord API Limits, if you want to send more than 5 you can use ActionRows as documented below

## ActionRows

ActionRows can be useful in many ways, they are as easy as components to use, just pass in one in the second argument to send one, or pass an array to send multiple, but ActionRows can help you in things like sending more than 5 components and sending components in different rows

### Initializing an ActionRow

An ActionRow can be initialized by doing the following

```js
const Slashcord = require("slashcord").default;

const actionRow = new Slashcord.ActionRow([component1, component2]);
```

A component can be added at any time using `addComponent`

```js
actionRow.addComponent(component3);
```

### Exceeding 5 components

Due to Discord API Limits an ActionRow can only have 5 components, also if you are using the method of passing an array of components you are also limited to 5, to exceed 5 components, you just make 2 or more ActionRows, add the components to the ActionRow, then send an array of the 2 or more ActionRows, example:

```js
const Slashcord = require("slashcord").default;

const button = new Slashcord.MessageButton()
  .setCustomId("big_yes")
  .setStyle("red")
  .setLabel("ur mom fat xddd");

const button2 = new Slashcord.MessageButton()
  .setCustomId("big_yes2")
  .setStyle("red")
  .setLabel("ur mom fat xddd 2");

const button3 = new Slashcord.MessageButton()
  .setCustomId("big_yes3")
  .setStyle("red")
  .setLabel("ur mom fat xddd 3");

const button4 = new Slashcord.MessageButton()
  .setCustomId("big_yes4")
  .setStyle("red")
  .setLabel("ur mom fat xddd 4");

const button = new Slashcord.MessageButton()
  .setCustomId("big_yes5")
  .setStyle("red")
  .setLabel("ur mom fat xddd 5");

const button2 = new Slashcord.MessageButton()
  .setCustomId("big_yes6")
  .setStyle("red")
  .setLabel("ur mom fat xddd 6");

const firstActionRow = new Slashcord.ActionRow([
  button1,
  button2,
  button3,
  button4,
  button5,
]);

const secondActionRow = new Slashcord.ActionRow([button6]);

interaction.reply("a message", [firstActionRow, secondActionRow]);
```

If you want to send 2 buttons but in 2 different rows just do as above except only add 1 in each ActionRow

## Receiving Button Clicks

Receiving button clicks can be done in 2 ways, either awaiting the button click or having a listener, here is an example for both:

### Listener

```js
const { Client } = require("discord.js");
const Slashcord = require("slashcord").default;

// Defining our new client.
const client = new Client();

client.on("button", (button) => {
  button.reply(
    `Button with custom id ${button.customId} was pressed by ${button.member.user.tag}!`
  );
});

client.on("ready", () => {
  // Initialize Slashcord and it's arguments.
  new Slashcord(client, "commands", {
    testServers: ["id", "id2"],
    botOwners: ["id"],
  });
});

// Get your token
client.login("token");
```

### Awaiting

```js
const filter = (b) =>
  (b.member.id = interaction.member.id && b.customId == "button_example_id");

const message = await interaction.fetchReply();

Slashcord.awaitButtons(message, filter, {
  max: 1,
  time: 600000,
  errors: ["time"],
})
  .then((collected) => {
    const button = collected.first();

    button.reply(
      `Button with custom id ${button.customId} was pressed by ${button.member.user.tag}!`
    );
  })
  .catch((e) => console.log(e));
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Special Thanks

Mawlicious
Mystic
KrabbyBucketz
