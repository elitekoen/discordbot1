//Required
const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')

//Files
const { prefix } = require('./config.json')
const { mongoPath } = require('./config.json')
const config = require('./config.json')

const client = new DiscordJS.Client({
    partials: ['MESSAGE', 'REACTION']
})

client.once('ready', () => {

    console.log('bot is online')
    new WOKCommands(client, {
        commandsDir: 'commands',
        featuresDir: 'features',
        messagesPath: '',
        showWarns: true,
        testServer: '727660436639711313',
        del: -1,
        defaultLangauge: "english",
        dbOptions: {
            // These 4 are the default options
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        },
    })
        .setDefaultPrefix(prefix)
        .setColor('RANDOM')
        .setMongoPath(mongoPath)
        .setCategorySettings([
            {
                name: 'moderation',
                emoji: '🚨'
            }
        ])
})

client.login(config.token)