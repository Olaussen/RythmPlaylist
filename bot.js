
import RythmPlaylist from './bot/RythmPlaylist'
import Discord from 'discord.js'

require('dotenv').config()
const client = new Discord.Client();
let BOT
const prefix = '!pp'

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.once("reconnecting", () => {
    console.log("Reconnecting!");
});

client.once("disconnect", () => {
    console.log("Disconnect!");
});

const validateMessage = async (message) => {
    const channel = message.member.voice.channel
    BOT = BOT ? BOT : new RythmPlaylist(message, channel)
    if (channel) {
        BOT.execute(message)
    } else {
        message.channel.send(':robot: **You need to join a voice channel first!**');
    }
}

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    validateMessage(message)
});

client.login(process.env.BOT_TOKEN);