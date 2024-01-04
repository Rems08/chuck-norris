// Importation des modules nécessaires
import { Client, Events, GatewayIntentBits } from 'discord.js';
import fetch from 'node-fetch';
import config from './config.json' assert { type: 'json' };

// Création d'une nouvelle instance de client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.login(config.token);

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'chuck-norris') {
        const joke = await fetchJoke();
        await interaction.reply(joke);
    }
});

async function fetchJoke() {
    try {
        const response = await fetch('https://geek-jokes.sameerkumar.website/api?format=json');
        const data = await response.json();
        return data.joke;
    } catch (error) {
        console.error('Error fetching joke:', error);
        return 'Could not fetch joke.';
    }
}
