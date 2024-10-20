import process from "node:process";
import path from "node:path";
import util from "node:util"

import { readFile } from "./helpers.js";

export const CATEGORY_TITLE_ATTRIBUT = "title";
export const RESOURCE_CATEGORY_ATTRIBUT = "Thème";
export const RESOURCE_TYPE_ATTRIBUT = "Type";
export const RESOURCE_TITLE_ATTRIBUT = "Titre";
export const RESOURCE_URL_ATTRIBUT = "Adresse";
export const RESOURCE_ACCESS_ATTRIBUT = "Accessibilité";
export const RESOURCE_FORMAT_ATTRIBUT = "Format";
export const RESOURCE_LANG_ATTRIBUT = "Langue";

export const DEFAULT_CATEGORY_DESC = "Liste de ressources";

const __dirname = String(process.cwd());

export function getCategories(category_path="./data/categories.tsv") {
    const content = readFile(path.join(__dirname, category_path));

    // Assuming the first row contains the names of fields
    const titles = content.shift().split("\t");

    const categories = content.map( row => {
        const category = {};
        let i = 0;
        row = row.split("\t");
        titles.forEach(title => {
            category[title] = row[i++];
        });

        return category;
    });

    return categories;
}

export function getResources(resources_path="./data/resources.tsv") {
    const content = readFile(path.join(__dirname, resources_path));

    // Assuming the first row contains the names of fields
    const titles = content.shift().split("\t");

    const resources = content.map( row => {
        const resource = {};
        let i = 0;
        row = row.split("\t");
        titles.forEach(title => {
            resource[title] = row[i++];
        });

        return resource;
    });

    return resources;
}

export function getOrderedResources(categories=null, resources=null) {
    categories = categories || getCategories();
    resources = resources || getResources();

    return categories.map( category => {
        const cat_resources = resources.filter( 
            resource => (resource[RESOURCE_CATEGORY_ATTRIBUT] == category[CATEGORY_TITLE_ATTRIBUT])
        );
        //console.debug(cat_resources);

        const cat_types = Array.from(
            new Set(cat_resources.map(resource => resource[RESOURCE_TYPE_ATTRIBUT]))
        ).sort();

        const types = cat_types.map(type => {
            const type_resources = cat_resources.filter(resource => (type == resource[RESOURCE_TYPE_ATTRIBUT]));
            type_resources.sort((r1, r2) => (r1["RESOURCE_TITLE_COLUMN_TITLE"] < r2["RESOURCE_TITLE_COLUMN_TITLE"]));
            return {type, "resources": type_resources};
        });
        //console.debug(util.inspect(types, {depth: null, colors: true}));

        return {category, types};
    });
}
