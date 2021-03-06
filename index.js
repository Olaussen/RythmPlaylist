
import RythmPlaylist from './bot/RythmPlaylist.js'
import * as db from './database/DatabaseHandler.js'
import Discord from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

let testing = false
const client = new Discord.Client();
let BOT
const prefix = testing ? "-" : "!"

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    BOT = new RythmPlaylist(await db.initializeGuilds())
});

client.once("reconnecting", () => {
    console.log("Reconnecting!");
});

client.once("disconnect", () => {
    console.log("Disconnect!");
});

const validateMessage = async (message) => {
    const channel = message.member.voice.channel
    if (channel && BOT) {
        BOT.execute(message)
    }
}

client.on('message', message => {
    if (!message.content.toLocaleLowerCase().startsWith(prefix) || message.author.bot) return;
    validateMessage(message)
});

client.login(testing ? process.env.TEST_TOKEN : process.env.BOT_TOKEN);