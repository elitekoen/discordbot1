const { MessageManager } = require("discord.js");

module.exports = {
    category: 'moderation',
    description: 'Clears <number> of messages',
    permissions: ['MANAGE_MESSAGES'],
    minArgs: '1',
    expectedArgs: '<number>',
    aliases: ['purge', 'clean'],

    callback: async ({ message }) => {
        const messageArray = message.content.split(' ');
        const args = messageArray.slice(1);

        let deleteAmount;

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) { return message.reply(`I- I'm sorry but you can only use numbers with this command`) }

        if (parseInt(args[0]) > 100) {
            return message.reply(`Sorry but you can only delete up to 100 messages at a time`)
        } else {
            deleteAmount = parseInt(args[0])
        }

        message.channel.bulkDelete(deleteAmount + 1, true);
        message.reply(`**Successfuly** deleted ***${deleteAmount}*** messages`)

        
    }
}