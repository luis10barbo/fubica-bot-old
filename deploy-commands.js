const { SlashCommandBuilder, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");

require("dotenv").config();

const clientId = "1014900816404021308";

const commands = [
  new SlashCommandBuilder()
    .setName("rs")
    .setDescription("Envia jogada recente do jogador especificado")
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("Nick ou id do jogador para fazer request")
        .setRequired(true)
        .setMaxLength(15)
    )
    .addStringOption((option) =>
      option
        .setName("mode")
        .setDescription("Modo de jogo (em numero)")
        .addChoices(
          { name: "Standard", value: "0" },
          { name: "Taiko", value: "1" },
          { name: "Catch the Beat", value: "2" },
          { name: "Mania", value: "3" }
        )
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

rest.put(Routes.applicationCommands(clientId), { body: commands });
