import process from "node:process";
import { getIds } from "../../utils/helpers.js";

import { SlashCommandBuilder, REST, Routes } from "discord.js";

export const command = {
	"data": new SlashCommandBuilder()
		.setName('exit')
		.setDescription('Exit bot!'),
	async execute(interaction) {
        const { token, clientId, guildId } = getIds();

        const rest = new REST().setToken(token);

        rest.put(Routes.applicationCommands(clientId), { body: [] })
            .then(() => console.log('Successfully deleted all application commands.'))
            .catch(console.error);
		await interaction.reply('Exit!');
        process.exit(-1);
	}
};