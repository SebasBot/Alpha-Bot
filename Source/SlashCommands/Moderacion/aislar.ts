import { SlashCommandBuilder } from '@discordjs/builders';
import { BaseCommandInteraction, User, CommandInteractionOptionResolver, MessageActionRow, MessageButton, GuildMember, MessageEmbed, CommandInteraction, ContextMenuInteraction, ButtonInteraction } from 'discord.js';

export default {
    name: 'aislar',
    data: new SlashCommandBuilder()
        .setName('aislar')
        .setDescription('Aisla a un usuario de hablar o interactuar')
        .addUserOption(option =>
            option.setName('usuario')
            .setDescription('El Objetivo')
            .setRequired(true)
        )
        .addNumberOption( option =>
            option.setName('tiempo')
            .setDescription('El tiempo aislado (Si introduces 0, liberas el castigo)')
            .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('razon')
            .setDescription('La causa del aislamiento')
            .setRequired(false)
        ),

    async execute(Discord:any, BOT:any, Interaction:BaseCommandInteraction){

        if(!Interaction.memberPermissions?.has('MODERATE_MEMBERS'))
        {
            return Interaction.reply(
                {
                    content:'No puedes AISLAR a ningun usuario sin el permiso "Aislar Usuarios"',
                    files: ['https://media.discordapp.net/attachments/892129709482209291/964039264444768277/Screenshot_20220414-004731_Discord.jpg'],
                    ephemeral: true
                }    
            )
        }

        if(!Interaction.guild?.me?.permissions.has('MODERATE_MEMBERS'))
		{
			return Interaction.reply(
                { 
				content:`No tengo permisos de aislar miembros\n`+
				`Asegurate de que tenga "Aislar Usuarios"`,
                files: ['https://media.discordapp.net/attachments/892129709482209291/964039264444768277/Screenshot_20220414-004731_Discord.jpg'], 
				ephemeral: true 
			    }
            )
		}

        const usuario = (Interaction.options as CommandInteractionOptionResolver).getUser('usuario')
        var Tiempo =    (Interaction.options as CommandInteractionOptionResolver).getNumber('tiempo')
        var Razon =     (Interaction.options as CommandInteractionOptionResolver).getString('razon')
        var Target =    Interaction.guild?.members.cache.get((usuario as User).id)
        
        var Embed1 = {
            color: 0xFFFFFF,
            title:`⚠️ Aislamiento ⚠️`,
            description: `¿Quieres aislar a ${usuario?.username}?`
        }

        var Embed2 = {
            color: 0xFFFFFF,
            author: {
                name:`⚠️ ${usuario?.username} Ha sido aislado ⚠️`,
                iconURL: usuario?.displayAvatarURL({dynamic: true, format: 'png'})
            },
            fields:[
                {
                name:`Se lo merecia ¿No?`,
                value: `Ahora tendra que esperar **${Tiempo} minuto(s)**`,
                inline: false
                }
            ]

        }

        const Botones = new MessageActionRow()
		.addComponents(
			new MessageButton()
			.setCustomId('approve')
			.setLabel('Si')
			.setStyle('DANGER'),

            new MessageButton()
			.setCustomId('deny')
			.setLabel('No')
			.setStyle('SECONDARY')
		);

        if( (Tiempo as number) <= 0 ){
            Tiempo = null;
            Embed1.description = `Esto quitará el aislamiento a ${(usuario as User).username} ¿Desea continuar?`
        } 
        await Interaction.reply
        (
            {
                    embeds: [Embed1],
                    components: [Botones]
            }
        )
        .then(()=>
            {
            const filter = (i:any) => i.user.id === Interaction.member?.user.id;
            const Collector = Interaction.channel?.createMessageComponentCollector(
                    {
                        filter, time: 15000
                    }
            ) 
            Collector?.on('collect', async (collctd:ButtonInteraction) =>{
                await collctd.deferUpdate().catch(console.error);
                switch(collctd.customId)
                    {
                    case "approve":
                        await Target?.timeout(
                            Tiempo? Tiempo*60*1000: Tiempo, 
                            Razon ||'Ningun motivo aparente'
                        )
                        .then( ()=>
                        {
                            if(Tiempo)
                            {
                                collctd.editReply( 
                                    {
                                        content:'Ejecutando Castigo...', 
                                        embeds:[], 
                                        components:[]
                                    }
                                )
                                Interaction.channel?.send(
                                    {
                                        embeds:[Embed2]
                                    }
                                )                
                            }
                            else
                            {
                                collctd.editReply(
                                    {
                                        content:'Ejecutando Liberación...', 
                                        embeds:[], 
                                        components:[]
                                    }
                                )
                                Interaction.channel?.send(
                                    {
                                        content:`${usuario?.username} ha sido liberado de su castigo `
                                    }
                                )
                                            
                            }
                        })
                        .catch(()=>
                            {
                                collctd.editReply(
                                    {
                                        content:'Ha ocurrido un error, no se pudo aislar al usuario', 
                                        embeds:[], 
                                        components:[]
                                    }
                                )
                                Interaction.channel?.send(
                                    {
                                        content:'Quizas no tengo permisos de Aislar a este usuario o ni exista... Quien sabe'
                                    }
                                )    
                            });
                            break;
                            case "deny":
                                collctd.editReply(
                                    {
                                        content:'Te recomiendo que utilices esto bien :/', 
                                        embeds:[], 
                                        components:[]
                                    }
                                );
                            break;
                    }        
            })
            }
        )
        .catch(console.error)
    }
}