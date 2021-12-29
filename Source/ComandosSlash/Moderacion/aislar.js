const {SlashCommandBuilder} = require('@discordjs/builders')
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
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

    async execute(Discord, cliente, interaccion){
        if(!interaccion.memberPermissions.has('MODERATE_MEMBERS')){
            return interaccion.reply('No puedes AISLAR a ningun usuario, fuera de mi vista')}
            
        const usuario = interaccion.options.getUser('usuario')
        var Tiempo = interaccion.options.getNumber('tiempo')
        var Razon = interaccion.options.getString('razon')
        var Target = interaccion.guild.members.cache.get(usuario.id)
        
        
        var Embed1 = {
            color: 'RANDOM',
            title:`⚠️ Aislamiento ⚠️`,
            description: `¿Quieres aislar a ${usuario.username}?`
        }

        var Embed2 = {
            color: 'GREY',
            author:{
                name:`⚠️ ${usuario.username} Ha sido aislado ⚠️`,
                icon_url: usuario.displayAvatarURL({dynamic: true, format: 'png'})
            },
            fields:[
                {
                name:`Se lo merecia ¿No?`,
                value: `Ahora tendra que esperar **${Tiempo} minuto(s)**`
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
		)




        if(Tiempo <= 0 ){
            Tiempo = null;
            Embed1.description = `Esto quitará el aislamiento a ${usuario.username} ¿Desea continuar?`
        } 
        if(!Razon){ 
            Razon = 'Ningun motivo aparente' 
        }

        


        await interaccion.reply({embeds: [Embed1], components: [Botones]})


        const filter = (i)=> i.user.id === interaccion.member.user.id;
        const Collector = interaccion.channel.createMessageComponentCollector({
        filter, time: 15000
        })

        Collector.on('collect', async collctd =>{
            try {
                await collctd.deferUpdate();

                switch(collctd.customId){
                    case "approve":
                        await Target.timeout(Tiempo? Tiempo*60*1000: Tiempo , Razon )
                        .then( ()=>{

                            if(Tiempo){
                                collctd.editReply({content:'Ejecutando Castigo...', embeds:[], components:[]})
                                interaccion.channel.send({embeds:[Embed2]})
                                
                            }else{
                                collctd.editReply({content:'Ejecutando Liberación...', embeds:[], components:[]})
                                interaccion.channel.send({content:`${usuario.username} ha sido liberado de su castigo `})

                            }
                            
                        })
                        .catch(()=>{
                            collctd.editReply({content:'Oh vaya, que verguenza...', embeds:[], components:[]})
                            interaccion.channel.send({content:'Quizas no tengo permisos de Aislar a este usuario o ni exista... Quien sabe'})
                        
                        });

                    break;
                    case "deny":
                        collctd.editReply({content:'Te recomiendo que utilices esto bien :/', embeds:[], components:[]});
                    break;
                }

            } catch (error) {
                console.log(error)
                
            }
        
        })


       
        /*


        /aislar 
        usuario: [miembro mencionable]  
        tiempo: [0 o cualquier numero positivo] 
        razon: [nula o string promedio]
        
        si Tiempo es 0, entonces advertir al usuario sobre 
        nulificar aislamiento
        si no, avisar al usuario el tiempo del usuario aislado

        de todos modos, ejecutar metodo de aislamiento


        
        */ 



    }

}