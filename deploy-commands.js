import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { SlashCommandBuilder } from '@discordjs/builders';
import config from './config.json' assert { type: 'json' };

const { clientId, guildId, token } = config;

const commands = [
  new SlashCommandBuilder()
    .setName('chuck-norris')
    .setDescription('Renvoie une blague de Chuck Norris')
    .toJSON()
];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Début du processus d’enregistrement de la commande (/)');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log('Commande (/) enregistrée avec succès');
  } catch (error) {
    console.error(error);
  }
})();
