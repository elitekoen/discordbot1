module.exports = {
    category: 'fun',
    description: 'Play rock paper scissors against the bot',
    minArgs: '1',
    expectedArgs: '<rock|paper|scissors>',

    callback: ({ message, args }) => {
        const acceptedReplies = ['rock', 'paper', 'scissors'];
        const random = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[random];

        const choice = args[0];
        if (!choice) return message.reply(`rps rock|paper|scissors`);
        if (!acceptedReplies.includes(choice)) return message.reply(`${acceptedReplies.join(', ')}`);

        if (result === choice) return message.reply("It's a tie!")

        switch (choice) {
            case 'rock': {
                if (result === 'paper') return message.reply(`I won`)
                else return message.reply(`You won`)
            }
            case 'paper': {
                if (result === 'scissors') return message.reply(`I won`)
                else return message.reply(`You won`)
            }
            case 'scissors': {
                if (result === 'rock') return message.reply(`I won`)
                else return message.reply (`You won`)
            }
            default: {
                return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
            }
        }
    } 
}