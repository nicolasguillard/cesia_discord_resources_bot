export function getAuthor(name, iconURL, url) {
    return {name, iconURL, url};
}

export function sendEmbed(channel, embeds) {
    if (!Array.isArray(embeds)) {
        embeds = Array(embeds);
    }
    channel.send({ embeds: embeds });
}

export function editEmbed(message, embeds) {
    if (!Array.isArray(embeds)) {
        embeds = Array(embeds);
    }
    message.edit({ embeds });
}