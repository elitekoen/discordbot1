const messageSchema = require('../../schemas/message-schema');
const { addToCache } = require('../../features/rr');

module.exports = {
    minArgs: '1',
    category: 'moderation',
    description: 'makes a message for react roles',
    expectedArgs: '[channel tag] <Message text>',
    permissions: ['ADMINISTRATOR'],
    
    callback: async ({ message, args }) => {
        const { guild, mentions } = message
        const { channels } = message
        const targetChannel = channels.first() || message.channel

        if (channels.first()) {
            args.shift()
        }
        const text = args.join(' ')

        const newMessage = await targetChannel.send(text)

        if (guild.me.hasPermission('MANAGE_MESSAGES')) {
        message.delete()
        }

        if (!guild.me.hasPermission('MANAGE_ROLES')) {
        message.reply(
            'The bot requires access to manage roles to be able to give or remove roles'
        )
        return
        }

        addToCache(guild.id, newMessage)

        new messageSchema({
        guildId: guild.id,
        channelId: targetChannel.id,
        messageId: newMessage.id,
        })
        .save()
        .catch(() => {
            message
            .reply('Failed to save to the database, please report this!')
            .then((message) => {
                message.delete({
                timeout: 1000 * 10,
                })
            })
        })
    },
    }