const {SlashCommandBuilder} = require('@discordjs/builders')
const Disc =require('discord.js')
module.exports={
    name: "clonar",
    data: new SlashCommandBuilder()
        .setName('clonar')
        .setDescription('Hace una replica de un canal de texto objetivo')
        .addStringOption(option =>
            option.setName('id')
            .setDescription('Id del canal que será clonado')
            .setRequired(false)
        ),
    
    async execute(cliente, Discord, interaccion){
        var Canal = interaccion.options.getString('id') || interaccion.channel.id
        var Target = interaccion.guild.channels.cache.get(Canal)
        
        if(!Target) return interaccion.reply(`No existe ningun canal con este id => ${Canal}`)
        if(!interaccion.memberPermissions.has('MANAGE_CHANNELS')) return interaccion.reply('No puedes clonar este canal')

        const Objeto = {
            color:"BLACK",
            author:{
                name:`Clonar Canal`},
            fields :[
                {
                  name: `¿Estas seguro de clonar el canal ${Target.name}?`,
                  value: `Esto crea una replica del canal sin ningun texto`
                }
            ],
        }

        const Botones = new Disc.MessageActionRow()
		.addComponents(
			new Disc.MessageButton()
			.setCustomId('approve')
			.setLabel('Si')
			.setStyle('SUCCESS'),

            new Disc.MessageButton()
			.setCustomId('deny')
			.setLabel('No')
			.setStyle('SECONDARY')
		
        )

        await interaccion.reply({embeds: [Objeto] ,components: [Botones]})
            const filter = (i)=> i.user.id === interaccion.member.user.id;
            const Collector =interaccion.channel.createMessageComponentCollector({ filter, time: 15000 })
            
        Collector.on('collect', async cllctd =>{
            try{
                await cllctd.deferUpdate()
                console.log(`${Target.name} esta intentando ser clonado`)
                switch(cllctd.customId){
                    case 'approve':
                        Target.clone(this.name)
                            .then(()=>{
                                cllctd.editReply({content: 'Este canal ha sido clonado 😄', embeds:[], components:[] })
                            })
                            .catch(err=>{
                                cllctd.editReply({content:'Ha ocurrido un error en el proceso', embeds:[], components: []});
                                console.log(err)
                            })

                        break
                    case 'deny':
                        collctd.editReply({content:'Te recomiendo que no lo hagas de nuevo', embeds:[], components:[]});
                        break
                }
            }catch(err){
                console.log(err)
                console.log('algo simplemente salio mal')
            }


        })            

    }
}