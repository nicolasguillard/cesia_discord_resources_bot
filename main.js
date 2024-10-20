import fs from "node:fs";
import path from "node:path"

// Get IDs from .env
import dotenv from "dotenv";
dotenv.config();

import { getIds } from "./utils/helpers.js";

const { token, clientId, guildId } = getIds();

console.log("token", token)
console.log("clientId", clientId)
console.log("guildId", guildId)

// Because in a ES module
const __dirname = process.cwd();

// Discord API classes
import { Client, Collection, Events, GatewayIntentBits, REST, Routes } from "discord.js";
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Managing Application commands
client.commands = new Collection();
const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		//const command = require(filePath);
		const {command} = await import(filePath)

		console.log(`command ${command.data.name}`);

		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${client.commands.length} application (/) commands.`);

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