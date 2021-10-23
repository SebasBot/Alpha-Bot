const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Collector } = require('discord.js');


module.exports = {
	name: "latencia",
	data: new SlashCommandBuilder()
		.setName('latencia')
		.setDescription('Responde con un pong'),
	async execute(Discord, cliente, interaccion) {
		const boton = new MessageActionRow()
		.addComponents(
			new MessageButton()
			.setCustomId('primary')
			.setLabel('PING')
			.setStyle('PRIMARY')
		)
		await interaccion.reply({content: 'Toca el boton para mostrar la latencia', components: [boton]});
		
		
		const filter = i => i.customId === 'primary'&& i.user.id === interaccion.member.user.id;
			const Collector = interaccion.channel.createMessageComponentCollector({
				filter, time: 15000
			});
			


Collector.on('collect', async i =>{
	if(i.customId==='primary'){
	await i.deferUpdate();
	await i.editReply ({ content: `PONG! \n Latencia del API es de: ${interaccion.client.ws.ping}ms.`+ 
	`\n Latencia del BOT es de: ${Date.now() - interaccion.createdTimestamp}ms`, components: [] })
	Collector.stop()
	}
})





},
};