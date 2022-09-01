import { Client, GatewayIntentBits } from "discord.js"
import dotenv from "dotenv"
dotenv.config()

const token = process.env.BOT_TOKEN 
const botId = "1014900816404021308"
const client = new Client({intents:[GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]})

client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`)
})

client.on("interactionCreate", interaction => {

})

client.on("messageCreate", (message) => {
    if (message.channel.id !== "1014901140133007420") return

    if (message.author.id !== botId) {
        // Message is not from bot
        message.reply("testezao")
    }
    console.log(message.content)
})

client.login(token)