const { MessageEmbed } = require('discord.js');

module.exports = {
    aliases: 'user-info',
    category: 'moderation',
    description: 'Gives you infomration on a user or bot',
    permissions: ['MUTE_MEMBERS'],

    callback: async ({ message }) => {
        const { guild, channel } = message

        const user = message.mentions.users.first() || message.member.user
        const member = guild.members.cache.get(user.id)

        const embed = new MessageEmbed()
        .setAuthor(`Here's information for ${user.username}`, user.displayAvatarURL())
        .setColor('RANDOM')
        .addFields(
            {
                name: 'User tag',
                value: user.tag,
                inline: true
            },
            {
                name: 'Is bot',
                value: user.bot,
                inline: true
            },
            {
                name: 'Nickname',
                value: member.nickname || 'None',
                inline: true
            },
            {
                name: 'Joined server',
                value: new Date(member.joinedTimestamp).toLocaleDateString(),
                inline: true
            },
            {
                name: 'Joined Discord',
                value: new Date(user.createdTimestamp).toLocaleDateString(),
                inline: true
            },
            {
                name: 'Roles',
                value: member.roles.cache.size -1,
                inline: true
            }
        )
        message.channel.send(embed)
    }
}