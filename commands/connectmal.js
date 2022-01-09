const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const nameStr = new SlashCommandStringOption().setName("characterusername").setRequired(true).setDescription("The username you'd like to add to your character!");
const pfpStr = new SlashCommandStringOption().setName("characterpfp").setRequired(true).setDescription("The link to the profile picture you'd like to add to your character!");
const prefixStr = new SlashCommandStringOption().setName("characterprefix").setRequired(true).setDescription("The prefix you'd like to use to use your character! (This will have : added to the end)");
const { MessageEmbed } = require("discord.js");
const MyAnimeList = require("myanimelist-api");
const config = require("../config.json");

const mal = new MyAnimeList({
    'clientId': config.mal.id,
    'clientSecret': config.mal.secret
})

let connection;

(async () => {
    connection = await require('../database/db');
})();

module.exports = {
    data: new SlashCommandBuilder().setName('connectmal').setDescription("Connects you to MAL!"),
    execute: async (interaction) => {
        connection.query(``).then(res =>{
            if (res[0][0]) {
                return interaction.reply("You're already connected!")
            };
            const { challengeCode, url } = mal.auth.getChallenge(interaction.user.id);
            interaction.reply(`Please go to this url: ${url}`).then(async () => {
                let code;
                code = await new Promise(async (resolve, reject) => {
                    let timeoutID = setTimeout(() => {resolve('err');clearInterval(intervalID);
                    clearTimeout(timeoutID);}, 25000)

                    let intervalID = setInterval(() => {
                        connection.query(``).then(res =>{ 
                            if (res[0][0]) {
                                clearInterval(intervalID);
                                clearTimeout(timeoutID);
                                resolve(res[0][0].code)
                            }
                        })
                    }, 5000)
                })

                console.log(code)
                if (code == 'err') {
                    connection.query(``).then(res => {}).catch(err => {
                        if (err) {
                            return interaction.followUp('There was an error! Please try again.')
                        }
                    })
                }

                const { data } = await mal.auth.getRefreshToken(code, challengeCode)
                const accToken = data.access_token
                const refToken = data.refresh_token
                
                connection.query(``)
                connection.query(``).then(res => {}).catch(err => {
                    if (err) {
                        console.log(err)
                        connection.query(``)
                        interaction.followUp("There was an error, please try again.")
                    }
                })
                
                interaction.followUp("Your accounts have been successfully linked!")
            })
            
        })
    }
}
