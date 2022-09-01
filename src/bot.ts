import { Client, GatewayIntentBits } from "discord.js";
import { isStringNumber } from "./utilities";
import axios from "axios";
import dotenv from "dotenv";
import { json } from "stream/consumers";
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

  try {
    await interaction.deferReply();
  } catch (error) {
    console.log("O bot demorou demais para responder");
    return;
  }

  try {
    if (interaction.commandName === "rs") {
      const userOption = interaction.options.getString("user") || ""; // user: option at command (required for now)
      const modeOption = interaction.options.getString("mode") || "0"; // mode: option at command (optional)
      console.log("debog 2");

      if (typeof userOption === null) return; // return if user: is null

      const searchMode = (() => {
        if (isStringNumber(userOption) === true) {
          return "id";
        } else {
          return "name";
        }
      })();

      try {
        await axios({
          method: "get",
          url: `https://api.fubi.ca/get_player_scores?${searchMode}=${userOption}&mode=${modeOption}&scope=recent&limit=1`,
          responseType: "json",
        })
          .then(async (result) => {
            await interaction.editReply(JSON.stringify(result.data));
            console.log("debog 4");
          })
          .catch(async (error) => {
            if (error.response) {
              switch (error.response.data.status) {
                case "Player not found.":
                  await interaction.editReply("Jogador não encontrado");
                  break;
                case "Invalid gamemode.":
                  await interaction.editReply("Modo não encontrado");
                  break;
                default:
                  await interaction.editReply(
                    "Algum erro ocorreu cara, se vira ae: " +
                      JSON.stringify(error.response.data)
                  );
              }
            } else if (error.request) {
              console.log("request");
            } else {
              console.log("none");
            }
          });
      } catch (error) {}
    }
  } catch (error) {}
});

client.login(token);
