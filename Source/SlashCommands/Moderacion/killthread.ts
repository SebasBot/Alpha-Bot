import { SlashCommandBuilder } from '@discordjs/builders';
import { BaseCommandInteraction, ButtonInteraction, CommandInteractionOptionResolver, GuildBasedChannel, MessageActionRow, MessageButton, TextChannel, ThreadChannel } from 'discord.js';

export default {
    name: 'killthread',
    data: new SlashCommandBuilder()
        .setName('killthread')
        .setDescription('Elimina el hilo actual o cualquier seleccionado')
        .addStringOption(option =>
            option.setName('id')
            .setDescription('ID del hilo')
            .setRequired(false)
        ),

    async execute(Discord:any, BOT:any, Interaction:BaseCommandInteraction)
    {
        var Thread = (Interaction.options as CommandInteractionOptionResolver)
            .getString('Hilo') || Interaction.channel?.id
        var Target = Interaction.guild?.channels.cache.get((Thread as string))
        if(!Target) return Interaction.reply('No existe ningun hilo con este id => '+Thread)
        var Parent = Interaction.guild?.channels.cache.get((Target.parentId as string))      
        if(Target.type == 'GUILD_TEXT') return Interaction.reply('ESTE ES UN CANAL DE TEXTO')
        if( (Target as ThreadChannel).ownerId != Interaction.member?.user.id )
        {
        if(!Interaction.memberPermissions?.has('MANAGE_THREADS')) return Interaction.reply('No puedes eliminar este hilo')
        }
        const Objeto = {
            color: 0xFFFFFF,
            author:{
                name:`Eliminar Hilo`},
            fields :[
                {
                  name: `¿Estas seguro de eliminar el hilo ${Target.name}?`,
                  value: `Pertenece al canal ${(Parent as GuildBasedChannel).name}`
                }
            ],
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
		)

        await Interaction.reply(
            {
            embeds: [Objeto] ,components: [Botones]
            }
        ).then(()=>
            {
                const filter = (i: any)=> i.user.id === Interaction.member?.user.id;
                const Collector = Interaction.channel?.createMessageComponentCollector(
                    {
                    filter, time: 15000
                    }
                )
                Collector?.on('collect', async (collctd:ButtonInteraction) =>
                    {
                            await collctd.deferUpdate().catch((e)=>
                            {
                                console.log(e); 
                                console.log('Ha ocurrido un error')
                            });
                            switch(collctd.customId){
                                case 'approve':
                                    (Target as ThreadChannel).delete('Eliminado por Author o Moderador')
                                    //Despues...
                                    .then(()=>{
                                        (Parent as TextChannel).send(`El hilo \'${Target?.name}\' ha sido eliminado, tengan un buen dia`)
                                    })
                                    .catch((err)=>
                                        {
                                        collctd.editReply(
                                            {
                                                content:'Ha ocurrido un error en el proceso', 
                                                embeds:[], 
                                                components: []
                                            }
                                        );
                                        console.log(err)
                                    })
                                    Collector.stop()
                                break;
                                case 'deny':
                                    collctd.editReply(
                                        {
                                            content:'Te recomiendo que no lo hagas de nuevo', 
                                            embeds:[], 
                                            components:[]
                                        }
                                    );
                                break;
                            }
    
                    }
                )
    
            }
        ).catch((e)=>
            console.log(e)
        )
    }

}