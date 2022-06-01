import { SlashCommandBuilder } from '@discordjs/builders'
import {BaseCommandInteraction, CategoryChannel, CommandInteractionOptionResolver, Interaction, TextChannel, VoiceChannel } from 'discord.js'


export default {
	name: "createlog",
	data: new SlashCommandBuilder()
		.setName('createlog')
		.setDescription('Prepara un canal donde se registra todas las interacciones de Alpha')
        .addChannelOption(option=>
			option
				.setName('canal')
				.setDescription('El canal donde alpha hará los registros')
				.setRequired(true)	
		)
        ,
	async execute(Discord:any, BOT:any, Interaction:BaseCommandInteraction)
    {
		const TargetChannel = (Interaction.options as CommandInteractionOptionResolver).getChannel('canal')

		if(TargetChannel instanceof CategoryChannel || TargetChannel instanceof VoiceChannel)
		{
			return Interaction.reply({ 
				content:`Este canal no es valido (por alguna razon)\nBusca otro`, 
				ephemeral: true 
			})
		}


		if(!Interaction.guild?.me?.permissions.has("EMBED_LINKS"))
		{
			return Interaction.reply({ 
				content:"No tengo permisos de escribir registros en el canal deseado"+
				"\n"+
				"Asegurate de que tenga el permiso de 'Insertar Enlaces'", 
				ephemeral: true 
			})
		}

		if(!Interaction.memberPermissions?.has('MANAGE_CHANNELS')) 
		{
			return Interaction.reply(			
				{ 
				content:`No puedes crear registros sin el permiso "Gestionar Canales"`, 
				ephemeral: true 
				}
			)
		}

		
		try{
		const LOG_INFO = 
		{
			ServerID: Interaction.guild?.id, 
			LogChannel: Interaction.guild.channels.cache.get(TargetChannel?.id?TargetChannel.id:'Error'),
		};

		(LOG_INFO.LogChannel as TextChannel).send(
			{
				embeds:[
					{
						color: '#FFFFFF',
						title: 'Ahora los registros se harán aqui',
						description: 'Si tiene dudas al respecto, comuniquese con @SebasBot#4584',
						image:
						{url:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Cog-scripted-svg-blue.svg/1200px-Cog-scripted-svg-blue.svg.png'}
					}
				]
			}
		).then(()=>
		{
			Interaction.reply(
				{ 
					content:`Ahora los registros de AlphaBot se haran en ${TargetChannel}`, 
					ephemeral: true 
				}
			)
		})
		.catch(()=>
		{
			Interaction.reply(
				{ 
					content:`No se pudo crear ningun registro en ${TargetChannel}\nAsegurate de que tenga el permiso de 'Ver y Escribir en canal' y 'Insertar enlaces' en el canal objetivo`, 
					ephemeral: true 
				}
			)
		})
		await BOT.Logs.set(LOG_INFO.ServerID, LOG_INFO.LogChannel)
		}
		catch(e)
		{
			console.log(e)
		}
	}
}