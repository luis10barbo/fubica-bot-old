import { Client, GatewayIntentBits } from "discord.js";
import { isStringNumber } from "./utilities";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.BOT_TOKEN;
const botId = "1014900816404021308";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === "rs") {
    await interaction.reply("trabalhando");
    const userOption = interaction.options.getString("user"); // user: option at command (required for now)
    const modeOption = interaction.options.getString("mode") || "0"; // mode: option at command (optional)
    if (typeof userOption === null) return; // return if user: is null

    if (isStringNumber(userOption) === true) {
      const response = await axios({
        method: "get",
        url: `https://api.fubi.ca/get_player_scores?id=${userOption}&mode=${modeOption}&scope=recent&limit=1`,
        responseType: "json",
      }).catch((error) => console.log(error));
      console.log(response);

      await interaction.editReply(JSON.stringify(response?.data));
    } else {
      const response = await axios({
        method: "get",
        url: `https://api.fubi.ca/get_player_scores?name=${userOption}&mode=${modeOption}&scope=recent&limit=1`,
        responseType: "json",
      }).catch((error) => console.log(error));
      console.log(response);

      await interaction.editReply(JSON.stringify(response?.data));
    }
  }
});

client.on("messageCreate", (message) => {
  if (message.channel.id !== "1014901140133007420") return;

  if (message.author.id !== botId) {
    // Message is not from bot
    message.reply("testezao");
  }
  console.log(message.content);
});

client.login(token);
