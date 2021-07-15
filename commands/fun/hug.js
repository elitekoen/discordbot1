const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    category: 'fun',
    description: 'hugs @ person',

    callback: async ({ message }) => {
        const url = 'https://some-random-api.ml/animu/hug';

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error has occured`)
        }

        try {
            const embed = new MessageEmbed()
            .setTitle(`@${message.author.username} hugs @${message.mentions.users.first().username || message.mentions.members.first()}`)
            .setImage(data.link)

            await message.channel.send(embed)
        } catch (e) {
            return message.reply(`You silly you can't hug no one`)
        }
    }
}