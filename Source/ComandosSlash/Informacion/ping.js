const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Collector } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Responde con un pong'),
	async execute(interaccion) {
		const boton = new MessageActionRow()
		.addComponents(
			new MessageButton()
			.setCustomId('primary')
			.setLabel('Boton')
			.setStyle('PRIMARY')
		)
		await interaccion.reply({content: 'Toca aqui', components: [boton]});
		
		
		const filter = i => i.customId === 'primary'&& i.user.id === interaccion.member.user.id;
			const Collector = interaccion.channel.createMessageComponentCollector({
				filter, time: 15000
			});
			


Collector.on('collect', async i =>{
	if(i.customId==='primary'){
	await i.deferUpdate();
	await i.editReply ({ content: `PONG! Has presionado el boton! `, components: [] })
	Collector.stop()
	}
})





},
};