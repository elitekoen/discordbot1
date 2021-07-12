const { MessageEmbed } = require('discord.js');

module.exports = {
    category: 'moderation',
    description: 'Bans a user from the guild',
    expectedArgs: '<mention> <reason>',
    minArgs: '1',
    permissions: ['BAN_MEMBERS'],
    callback: ({ message }) => {
        let member = message.mentions.members.first();
        if (!member) return message.reply('Please mention someone to ban');
        let reason = args.slice(1).join(" ");
        if (!reason) reason = 'No reason mentioned';
        if (member.id === message.author.id) return message.reply(`I-I'm sorry you can't ban yourself from this server HEHE`);

        const embed = new MessageEmbed()
        .setTitle('You have been banned')
        .setDescription(`You have been banned from **${message.guild.name}** for **${reason}**`)
        .setTimestamp()
        .setColor('RANDOM')

        if(member.bannable) {
            member.send(embed).catch(error => message.channel.send(`I could not message the mentioned member`))
            .then(m => member.ban({reason}));
            message.channel.send(`**<@${member.user.tag}>** has been banned`)
        } else {
            message.reply(`Couldn't ban mentioned user`)
        }
    }
}