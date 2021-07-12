module.exports = {
    aliases: ['addrole'],
    category: 'moderation',
    description: 'Give a role to a user or bot',
    minArgs: '2',
    expectedArgs: '<User\'s @> <Role name>',
    permissions: ['MANAGE_ROLES'],

    callback: async ({ message, args }) => {
        const targetUser = message.mentions.users.first()
        if (!targetUser) {
            message.reply(`Sorry but you need to specify someone to give a role to`)
            return
        }

        args.shift()

        const roleName = args.join(' ')
        const { guild } = message

        const role = guild.roles.cache.find((role) => {
            return role.name === roleName
        })

        if (!role) {
            message.reply(`There is no role with the name ${roleName}`)
            return
        }

        const member = guild.members.cache.get(targetUser.id)
        member.roles.ass(role)

        message.channel.send(`I have given ${targetUser} the role ${roleName}`)
    }

}