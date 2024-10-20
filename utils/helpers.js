import fs from "node:fs";
import process from "node:process";

export function readFile(filepath) {
    const content = fs.readFileSync(filepath, "utf8");
    return content.split("\n");
}

export function getIds() {
    const token = process.env.token;
    const clientId = process.env.clientId;
    const guildId = process.env.guildId;
    const botName = process.env.botName;

    return {token, clientId, guildId, botName};
}