const discord = require("discord.js");
const conf = require("./config.json");
const fs = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const client = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES]});

let connection;

(async () => {
    connection = await require('./database/db');
})();

client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (client) => event.execute(client));
	} else if (event.name == "interactionCreate") {
		client.on(event.name, (interaction) => event.execute(interaction));
	} else if (event.name == "messageCreate") {
		client.on(event.name, (message) => event.execute(message));
	}
}

client.login(conf.bot.token)
