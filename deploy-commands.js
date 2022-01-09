const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const conf = require('./config.json');
const fs = require("fs");

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9'}).setToken(conf.bot.token);

rest.put(Routes.applicationCommands("929453485412454461"), {body: commands})
    .then(() => console.log("Successfully added commands!"))
    .catch(console.error);