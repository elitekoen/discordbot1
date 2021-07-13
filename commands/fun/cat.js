const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
    category: 'fun',
    description: 'Shows Image and facts about cats',

    callback: async ({ message }) => {
        const url = 'https://some-random-api.ml/img/cat';
        const facts = 'https://some-random-api.ml/facts/cat';

        let image, response;
        let fact, responses;

        try {
            response = await axios.get(url);
            image = response.data;

            responses = await axios.get(facts)
            fact = response.data
        } catch (e) {
            return message.channel.send(`An error occured, Please try again`)
        }

        const embed = new MessageEmbed()
        .setTitle('Random cat image and fact')
        .setColor('RANDOM')
        .setDescription(fact.fact)
        .setImage(image.link)

        await message.channel.send(embed)
    }
}