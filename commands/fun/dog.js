const axios = require('axios');
const { MessageEmbed, Presence } = require('discord.js');

module.exports = {
    category: 'fun',
    description: 'Shows image and facts about dogs',

    callback: async ({ message }) => {
        const url = 'https://some-random-api.ml/img/dog';
        const facts = 'https://some-random-api.ml/facts/dog'

        let image, response;
        let fact, responses;

        try {
            response = await axios.get(url);
            image = response.data;

            responses = await axios.get(facts);
            fact = responses.data;
        } catch (e) {
            return message.channel.send('an error has occured')
        }
        const embed = new MessageEmbed()
        .setTitle('Random dog image and fact')
        .setColor('RANDOM')
        .setDescription(fact.fact)
        .setImage(image.link)

        await message.channel.send(embed)

    }
}