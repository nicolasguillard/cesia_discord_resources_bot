# CeSIA's Discord server resources channel 

## Install the project locally
1. Clone the GitHub project : `git clone https://github.com/nicolasguillard/cesia_discord_resources_bot`
2. Run `cd cesia_discord_resources && npm i` to install modules

## Run the application : 
1. __Locally__ :
    1. Update the data files exporting sheets "Discord - Blocs and "Discord Ressources" from the [Google Sheets document "Ressources AI Safety" ](https://docs.google.com/spreadsheets/d/1wKqidvb5gIRDgfS6VaN6s96aMRF5Psrc3sPqZMRx-2I/edit?usp=sharing).
    2. If not done, [declare a Discord application](https://discord.com/developers/applications), following [the procedure](https://discordjs.guide/preparations/setting-up-a-bot-application.html) explained in discordjs doc.
        1. Before getting the invite link in OAuth2 screen :
            1. For OAuth2 step, select scopes "applications.command" and "bot".
            2. For Bot permissions, select "Send Messages", "Manage Messages" and "Read Message History".
        1. Copy `.env_template` file to `.env`
        2. Update `.env` file setting values of `token`, `clientId` and `guildId`.
            1. Get `guildId` from Discord Server, after setting _developer mode_.
            2. Get `token` (from Bot screen) and `clientId` (from General Information screen) from the Discord Application Manager.
    2. Run the application : `node .`.

2. __On Discord__ :
    1. Add the bot to Discord server with the invite link.
    2. Choose the targeted channel.
    3. Use `/resources` bot's command to update des embeded lists. Use `/removeall` command to remove all messages nesting an embed in order to clean the channel.
    4. (optional) Remove added slash commands with `/exit` command if necessary.
    5. Kick the bot.