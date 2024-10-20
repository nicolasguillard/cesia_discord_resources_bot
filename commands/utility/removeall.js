import { getIds } from "../../utils/helpers.js";
import { SlashCommandBuilder } from "discord.js";

const { botName } = getIds();

export const command = {
	"data": new SlashCommandBuilder()
		.setName('removeall')
		.setDescription('Remove bot_s messages'),
	execute(interaction) {
        interaction.channel.messages.fetch()
            .then(async messages => {
                // Messages from the bot with only on eembed
                messages.filter(
                    message => message.author.username == botName && message.embeds.length == 1
                ).forEach(message => {
                    // No more supported categories
                    const embed = message.embeds[0];
                    console.log(`Delete ${embed.data.title}`);
                    message.delete()
                        .then(msg => console.log(`Deleted message from ${msg.channel}`))
                        .catch(console.error);
                });

                await interaction.reply({ content: 'Messages removed!', ephemeral: true });
            })
            .catch(async (error) => {
                console.error(error)
                await interaction.reply({ content: 'Error with Messages edition!', ephemeral: true });
            });
	}
};