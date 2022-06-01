import { SlashCommandBuilder } from '@discordjs/builders';
import { BaseCommandInteraction, Interaction, MessageActionRow, MessageButton } from 'discord.js';

export default {
	name: "latencia",
	data: new SlashCommandBuilder()
		.setName('latencia')
		.setDescription('Mi Latencia X.X'),
	async execute(Discord:any, BOT:any, Interaction:BaseCommandInteraction) {
		const boton = new MessageActionRow()
		.addComponents(
			new MessageButton()
			.setCustomId('primary')
			.setLabel('Entiendo')
			.setStyle('PRIMARY')
		)
		await Interaction.reply(
			{
				content: `Pong! \n Latencia del API es de: ${Math.round(Interaction.client.ws.ping)} ms.`,
				components: [boton]
			}
		)
		.then(()=>
			{	
				const filter = (i:any) => i.customId === 'primary'&& i.user.id === Interaction.member?.user.id;
				const Collector = Interaction.channel?.createMessageComponentCollector({filter, time: 15000});
				Collector?.on('collect', async (i:any) =>
					{
						if(i.customId==='primary')
						{
							await i.deferUpdate();
							await i.editReply({components:[]})
							await i.followUp({ content: 'Vale, siempre estoy a tu servicio 👍' , ephemeral: true})
							Collector.stop()
						}
					}
				)
			}
		)
		.catch((e:any)=>
			{
				console.log(e)
			}
		)
	},	
};