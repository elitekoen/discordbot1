module.exports = {
    category: 'moderation',
    description: `dm's the @'d user`,
    permission: ['ADMINISTRATOR'],
    minArgs: '2',
    expectedArgs: '<mention> <message>',

    callback: async ({ message, args }) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.reply(`Sorry but you did not mention a valid user`)
        user.user.send(args.slice(1).join(" ")).catch(() => message.reply(
            `Sorry I couldn't dm <@${user}>, they might have dm's turned off`
        )).then(() => message.reply(`Sent the message to ${user}`))
    }
}