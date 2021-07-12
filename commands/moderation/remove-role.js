module.exports = {
    aliases: ['takerole', 'removerole', 'rmrole'],
    category: 'moderation',
    description: 'takes role from user or bot',
    minArgs: '2',
    expectedArgs: '<User\'s @> <Role name>',
    permissions: ['MANAGE_ROLES'],

    callback: async ({ message, args }) => {
        const targetUser= message.mentions.users.first()
        if (!targetUser) {
            message.reply (`Sorry but you need to specify someone to give a role to`)
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

        if (member.roles.cache.get(role.id)) {
            member.roles.remove(role)
            message.reply(`I have taken the role ${roleName} from ${targetUser}`)
        } else {
            message.reply(`${targetUser} does not have the role ${roleName}`)
        }
    }
}