const { MessageEmbed, MessageManager } = require('discord.js')

module.exports = {
    category: 'moderation',
    minArgs: '1',
    description: 'Kicks a user from the guild',
    expectedArgs: '<mention> <reason>',
    permissions: ['KICK_MEMBERS'],
    
    callback: async ({ message }) => {
        let member = message.mentions.members.first();
        if (!member) return message.reply(`Please mention someone to kick`);
        let reason = args.slice(1).join(' ');
        if (!reason) reason = 'No reason Mentioned'
        if (member.id === message.author.id) return message.reply(`I- I'm sorry you can not kick yourself from here HEHE`)

        const embed = new MessageEmbed()
        .setTitle('You have been kicked')
        .setDescription(`You have been kicked from **${message.guild.name}** for **${reason}**`)
        .setTimestamp()
        .setColor("RANDOM")

        if(member.kickable) {
            member.send(embed).catch(error => message.channel.send(`I could not message the mentioned member`))
            .then(m => member.kick({reason}));
            message.channel.send((`**<@${member.user.tag}>** has been kicked`))
        } else {
            message.reply(`Couldn't kick mentioned user`)
        }
    }
}