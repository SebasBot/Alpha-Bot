const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    name: "decir",
    data: new SlashCommandBuilder()
        .setName('decir')
        .setDescription('Puedo repetir lo que dices')
        .addStringOption(option => 
            option.setName('frase')
            .setDescription('Lo que dire por ti.')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('tts')
            .setDescription('¿Lo digo en voz alta?')
            .setRequired(false)
            .addChoice('Activado', 'tts-true')
            ),
    async execute(Discord, cliente, interaccion){
        var respuesta = interaccion.options.getString('frase')
        var tts = interaccion.options.getString('tts')

        
        if(respuesta.includes('discord.gg') || respuesta.includes('https://')) {
            return interaccion.reply({content:'**No deberias poner links y/o invitaciones en la frase**', ephemeral: true})
        }
        if(respuesta.includes('@everyone')||respuesta.includes('@here')){
            return interaccion.reply({content:'**Ahhh ¿Te querias pasar de listo poniendo everyone?**', ephemeral: true}) 
        }
        if(respuesta.length >= 100){
            return interaccion.reply({content:'**Te pasaste el limite de 100 caracteres, Ojo ahi**', ephemeral: true})
        }
        if(tts == 'tts-true'){
            
            interaccion.reply({content:'El mensaje que has enviado con el locutor es:', ephemeral: true})
            await interaccion.channel.send({ content: respuesta, tts: true })
        }else{
            interaccion.reply({content:'El mensaje que has enviado es:', ephemeral: true})
            await interaccion.channel.send({ content: respuesta })
        }

    }
}