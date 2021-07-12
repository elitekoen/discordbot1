//Required
const Discord = require('discord.js');
const client = new Discord.Client().setMaxListeners(0);
const { server } = ('http')
const path = require('path');
const fs = require('fs');
const CurrencySystem = require('currency-system');
const cs = new CurrencySystem
client.commands = new Discord.Collection();

//files
const config = require('./config.json')
const { prefix } = require('./config.json')
const antiAd = require('./commands/utils/anti-ad')



//catch unhandledRejection errors
process.on('unhandledRejection', error => {
    console.log('Error:', error)
});

//sets the bots activity and logs it in console
client.on('ready', async () => {
    console.log(`bot is logged in`)
    client.user.setActivity('a/help')
    antiAd(client)
});

// defines the basefile
const baseFile = 'command-base.js';
// defines the command base
const commandBase = require(`./commands/${baseFile}`)

const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))
        if(stat.isDirectory()) {
            readCommands(path.join(dir, file))
        } else if (file !== baseFile) {
            const option = require(path.join(__dirname, dir, file))
            commandBase(client, option)
        }
    }
}
readCommands('commands')




client.login(config.token)