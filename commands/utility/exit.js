import process from "node:process";
import { getIds } from "../../utils/helpers.js";

import { SlashCommandBuilder, REST, Routes } from "discord.js";

export const command = {
	"data": new SlashCommandBuilder()
		.setName('exit')
		.setDescription('Exit bot!'),
	async execute(interaction) {
        const { token, clientId } = getIds();

        const rest = new REST().setToken(token);

        rest.put(Routes.applicationCommands(clientId), { body: [] })
            .then(async () => {
                console.log('Successfully deleted all application commands.');
                await interaction.reply({ content: 'Commands deleted and Bot shut down!', ephemeral: true });
                process.exit(-1);
            })
            .catch(async (error) => {
                console.error(error)
                await interaction.reply({ content: 'Error with exiting!', ephemeral: true });
            });	
	}
};