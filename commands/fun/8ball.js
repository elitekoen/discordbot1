module.exports = {
    category: 'fun',
    description: 'tells your future',
    expectedArgs: '<question>',
    minArgs: '1',

    callback: async ({ message }) => {
        let rand = [
            'It is certain',
            'It is decidedly so',
            'Without a doubt',
            'Yes definitely',
            'You may rely on it',
            'As I see it, yes',
            'Most likely',
            'Outlook good',
            'Yes',
            'Signs point to yes',
            'Reply hazy try again',
            'Ask again later',
            'Better not tell you now',
            'Cannot predict right now',
            'Concentrate and ask again',
            `Don't count on it`,
            'My reply is no',
            'My sources say no',
            'Outlook not so good',
            'Very doubtful'
        ]

        let response = rand[Math.floor(Math.random()*(rand.length)-1)]

        return message.reply(response)
    }
}