import {
    RESOURCE_TITLE_ATTRIBUT, RESOURCE_URL_ATTRIBUT,
    DEFAULT_CATEGORY_DESC, RESOURCE_LANG_ATTRIBUT,
    RESOURCE_ACCESS_ATTRIBUT, RESOURCE_FORMAT_ATTRIBUT
} from './resources.js';
import { EmbedBuilder } from 'discord.js';

const Type_emojis = {
    "Cours": ":teacher:",
    "Forums": ":mega:",
    "Blogs": ":technologist:",
    "Listes de ressources": ":bookmark:",
    "Newsletters": ":envelope:",
    "Présentations": ":office_worker:",
    "Rapports": ":bar_chart:",
    "Sites web": ":dividers:",
    "Contenus": ":bookmark_tabs:",
    "Articles": ":page_facing_up:",
    "Livres": ":books:",
    "Codes": ":keyboard:",
    "eBooks": ":notebook:",
};
const Flag_emojis = {
    "FR": ":flag_fr:",
    "EN": ":flag_gb:"
};
const Accessibility_emojis = {
    "(+)": ":green_square:",
    "(++)": ":yellow_square:",
    "(++)": ":orange_square:",
};
const Res_format_emojis = {
    "Texte (html)": ":newspaper:",
    "Vidéo": ":film_frames:",
    "Papier": ":page_with_curl:",
    //"PDF": "",
    "-Multiples-": ":desktop:",
    "Interactif (html)": ":mouse_three_button:"
};
// :newspaper: :point_up_2:  :office_worker: :books: :microphone2: :page_facing_up: 

const TAB = "\u200b \u200b";

const Format = {
    "category_title": (title) => (title.toUpperCase(title)),
    "category_description": (description) => (description),
    "resource": (resource) => (
        `- [${resource[RESOURCE_TITLE_ATTRIBUT]}](${resource[RESOURCE_URL_ATTRIBUT]})`+ TAB +
        ` ${Format.lang_emoji(resource[RESOURCE_LANG_ATTRIBUT])}`+
        //` ${Format.access_emoji(resource[RESOURCE_ACCESS_ATTRIBUT])}` +
        //` ${Format.format_emoji(resource[RESOURCE_FORMAT_ATTRIBUT])}` +
        ""
    ),
    "type_title": (title) => (`> ${Format.type_emoji(title)} ${title}`),
    "resources_of_type": (resource_list) => (resource_list.join("\n")),
    "lang_emoji": (lang) => (lang in Flag_emojis ? Flag_emojis[lang] : lang),
    "access_emoji": (access) => (access in Accessibility_emojis ? Accessibility_emojis[access] : access),
    "format_emoji": (format) => (format in Res_format_emojis ? Res_format_emojis[format] : format),
    "type_emoji": (type) => (type in Type_emojis ? Type_emojis[type] : type),
};

export function getAuthor(name, iconURL, url) {
    return {name, iconURL, url};
}

export function getCategoryEmbed(
    title, description, color, thumbnail, types, timestamp=true, author=null
) {
    const embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(Format.category_title(title))
        .setDescription(Format.category_description(description || DEFAULT_CATEGORY_DESC))
        .setThumbnail(thumbnail)
        .setFooter({text: "Last update :"});

    types.forEach(type => {
        const resource_list = type["resources"].map( resource => (
            Format.resource(resource)
        ));

        embed.addFields({
            name: Format.type_title(type.type),
            value: Format.resources_of_type(resource_list)
        });
    });
    
    if (timestamp) {
        embed.setTimestamp();
    }
   
    if (author) {
        embed.setAuthor(author);
    }

	return embed;
}

export function getEmbeds(resourcesByCateg, timestamp=true, author=null) {
    return resourcesByCateg.map( category => {
        return getCategoryEmbed(
            category.category.title,
            "",
            category.category.color,
            category.category.thumbnail,
            category.types,
            timestamp,
            author
        );
    });
}