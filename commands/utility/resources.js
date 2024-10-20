import { chatInputApplicationCommandMention, SlashCommandBuilder } from "discord.js";
import { sendEmbed, editEmbed } from "../../utils/embed.js"
import { getOrderedResources } from "../../utils/resources.js";
import { getEmbeds, getCategoryEmbed } from "../../utils/embed_resources.js"
import { getIds } from "../../utils/helpers.js";

const { botName } = getIds();

export const command = {
	"data": new SlashCommandBuilder()
		.setName('resources')
		.setDescription('Refresh embedded resource lists!'),
	async execute(interaction) {
        const existingMessageMap = new Map();
        // Fetch published category lists from chanel
        interaction.channel.messages.fetch()
            .then(async messages => {
                // Mapping
                messages.filter(
                    message => message.author.username == botName && message.embeds.length == 1
                ).forEach(message => {
                    const embed = message.embeds[0];
                    existingMessageMap.set(embed.data.title, message);
                });

                // Generation of embeds from resources data
                const resourcesByCateg = getOrderedResources();
                const newEmbeds = getEmbeds(resourcesByCateg);
                const newEmbedMap = new Map();
                newEmbeds.forEach(newEmbed => {
                    console.log("new", newEmbed.data.title)
                    newEmbedMap.set(newEmbed.data.title, newEmbed);
                });

                console.log("existingMessageMap", existingMessageMap.keys());
                console.log("newEmbedMap", newEmbedMap.keys());

                const toEditTitleList = Array.from(new Set(existingMessageMap.keys()).intersection(new Set(newEmbedMap.keys())));
                console.log("toEditList", toEditTitleList);
                toEditTitleList.forEach( title => {
                    // Edit the message if already published
                    console.log(`Edit ${title}`);
                    editEmbed(existingMessageMap.get(title), newEmbedMap.get(title));
                });

                // New categories
                for (const [title, embed] of newEmbedMap.entries()) {
                    if (!toEditTitleList.includes(title)) {
                        console.log(`Publish ${title}`);
                        sendEmbed(interaction.channel, embed);
                    }
                }
                
                // No more supported categories
                for (const [title, message] of existingMessageMap.entries()) {
                    if (!toEditTitleList.includes(title)) {
                        console.log(`Delete ${title}`);
                        message.delete()
                            .then(msg => console.log(`Deleted message from ${msg.channel}`))
                            .catch(console.error);
                    }
                }     

                await interaction.reply({ content: 'Lists updated!', ephemeral: true });                
            })
            .catch(async (error) => {
                console.error(error)
                await interaction.reply({ content: 'Error while updating!', ephemeral: true });
            });
	}
};