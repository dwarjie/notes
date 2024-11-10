# discord.js

## Slash Commands
This provide users a first class way of interacting directly with your application.

This provides the following benefits:
- Integration with the Discord client interface
- Automatic command detection
- Setting of Typed arguments inputs (e.g., String, User, or Role)
- Validated or dynamic choices for inputs
- Private Responses ([[#Ephemeral message]])
- Pop-up form tyle inputs

> TIP: Three Important codes for fully functional Slash Commands
> 1. [[#Individual Command Files]]
> 2. [[#Command Handlers]]
> 3. Command Deployment Script

## Ephemeral message
This provides a whole new way of showing a response to the executor of the command. When using ephemeral message, the response will only be shown to the executor and will be hidden to other users in the channel.

To use the ephemeral response, set the ```ephemeral: true``` of the ```Command Interaction.reply()``` method.

## Individual Command Files
This is a process where you will create a specific folder for each of your commands. Create a ```command``` folder, inside that folder create another folder named ```utility```, this is where your command files will be created.

When creating a command, we can use the ```SlashCommandBuilder``` which is a class that creates a command definition that is API-compatible JSON data.

> Slash commands are requires a function to run when command is used, to respond to the interaction. If command failes to respond, discord will show that command failed.

## Command Handlers
With [[#Individual Command Files]] technique, all of our commands are now organized in a specific folder with specific files. Now, we need to load all these commands on startup of our app/bot for discord to know they exist. Using different node packages, we will dynamically read our command folder, store it into a collection, and load them one-by-one on startup.

```js

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

client.commands = new Collection()

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
```
### Command Listeners
Now, every use of command will execute an interaction which requires a respond from our app/bot. In order to create a listener for all of our command we can use the ```Client.interactionCreate``` event to return a response.

> Not all interactions are slash commands. Depending on your application, you may use the ```BaseInteraction.isChatInputCommand()``` method to check whether the interaction is a slash command or not.
### Command Execution
Once you verified if the interaction is a slash command and the command is matched with the command you have created, you execute the command and pass the interaction variable as it's argument.

```js

const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
```
## Command Deployment Script
This process is necessary. By doing this, our commands will be registered so they will appear in Discord. Command Deployment can be done in two (2) ways: Specific Guild or every Guild the bot is in.

>Slash commands only need to be registered once, and updated when the definition (description, options etc) is changed. As there is a daily limit on command creations, it's not necessary nor desirable to connect a whole client to the gateway or do this on every ready event. As such, a standalone script using the lighter REST manager is preferred.

By using the REST class of discord.js which manages the handlers for discord endpoints and Routes. We will be able to update/upload our commands to discord.
```js

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
```
