const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Responde con un pong'),
	async execute(interaccion) {
		await interaccion.reply('Pong!');
	},
};