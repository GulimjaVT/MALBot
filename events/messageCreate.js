/* const { Webhook, WebhookClient } = require("discord.js");
let connection;

(async () => {
    connection = await require('../database/db');
})();

module.exports = {
    name: "messageCreate",
    execute: async (message) => {
        connection.query(`SELECT * FROM ${message.guild.id}Charas WHERE user = '${message.author.id}';`).then(res => {
            prefixes = []
            res[0].forEach(char => {
                prefixes.push(char.prefix.toLowerCase());
            });

            prefixes.forEach(async (pre) => {
                if (message.toString().toLowerCase().startsWith(pre)) {
                    const webhooks = await message.channel.fetchWebhooks();
                    const webhook = webhooks.first()

                    connection.query(`SELECT * FROM ${message.guild.id}Charas WHERE prefix = '${pre}' AND user = '${message.author.id}';`).then(res => {
                        if (!webhook) {
                            message.channel.createWebhook("MovieBotHook").then(hook => {
                                message.delete();
                                hook.send({ content: message.toString().substring(pre.length), username: res[0][0].username, avatarURL: res[0][0].avatarurl})
                            })
                        } else {
                            message.delete();
                            webhook.send({ content: message.toString().substring(pre.length), username: res[0][0].username, avatarURL: res[0][0].avatarurl})
                        }
                    })
                }
            })
        })
    }
} */