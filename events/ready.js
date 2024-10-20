import { Events } from "discord.js";

export const eventHandler = {
	"name": Events.ClientReady,
	"once": true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};