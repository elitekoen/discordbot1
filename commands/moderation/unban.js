module.exports = {
    description: 'bans a user from the guild',
    category: 'moderation',
    minArgs: '1',
    expectedArgs: '<userid> <reason>',
    
    callback: async ({ message }) => {
        let userid = args[0];
        if (!userid) return message.reply(`Sorry you need to sate a ID to unban the user`)
        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason mentioned";
        if (userid === message.author.id) return message.reply(`You cannot ban yourself`)

        let bans = await message.guild.fetchBans()
        if (bans.has(userid)) {
            message.guild.members.unban(userid)
            message.channel.send(`I have unbanned ${userid}`)
        } else {
            messagey.reply(`Provided ID is invalid or is not banned`)
        }
    }
}