const {SlashCommandBuilder} = require('@discordjs/builders')
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'killthread',
    data: new SlashCommandBuilder()
        .setName('killthread')
        .setDescription('Elimina el hilo actual o cualquier seleccionado')
        .addStringOption(option =>
            option.setName('id')
            .setDescription('Id del hilo')
            .setRequired(false)
        ),
    async execute(Discord, cliente, interaccion){

        var Thread = interaccion.options.getString('id') || interaccion.channel.id
        var Target = interaccion.guild.channels.cache.get(Thread)

        if(!Target) return interaccion.reply('No existe ningun hilo con este id => '+Thread) 
        var Parent = interaccion.guild.channels.cache.get(Target.parentId)      

        if(Target.type == 'GUILD_TEXT') return interaccion.reply('ESTE ES UN CANAL DE TEXTO')

        if( Target.ownerId != interaccion.member.id ){
            if(!interaccion.memberPermissions.has('MANAGE_THREADS')) return interaccion.reply('No puedes eliminar este hilo')
        }


        const Objeto = {
            color:"BLACK",
            author:{
                name:`Eliminar Hilo`
            },
            fields :[
                {
                  name: `¿Estas Estas seguro de eliminar el hilo ${Target.name}?`,
                  value: `Pertenece al canal ${Parent.name}`
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

        await interaccion.reply({embeds: [Objeto] ,components: [Botones]})

            const filter = (i)=> i.user.id === interaccion.member.user.id;
            const Collector =interaccion.channel.createMessageComponentCollector({
            filter, time: 15000
            })

        Collector.on('collect', async collctd =>{
            try{
            await collctd.deferUpdate();
            switch(collctd.customId){
                case 'approve':
                    console.log(`${Target.name} admitido para ser eliminado`)
                    Target.delete('Eliminado por Author o Moderador')
                        .then(()=>{
                            Parent.send(`El hilo \'${Target.name}\' ha sido eliminado, tengan un buen dia`)
                            collctd.editReply({content:'Hilo Eliminado, te recomiendo que no lo hagas de nuevo', embeds:[], components:[]
                            })
                            console.log(`HILO \'${Target.name}\' FUE ELIMINADO`)
                        }).catch(err=>{
                        collctd.editReply({content:'Ha ocurrido un error en el proceso', embeds:[], components: []});
                        console.log(err)
                        Collector.stop()
                        })
            
                    break;
                case 'deny':
                        console.log(`${Target.name} no fue admitido para ser eliminado`)
                        collctd.editReply({content:'Te recomiendo que no lo hagas de nuevo', embeds:[], components:[]});
                    break;
            }

        }
        catch(error){
            console.log(error); 
            interaccion.channel.send({content: 'Ocurrio un error'})}


        })

    }



}