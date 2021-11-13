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
        .addBooleanOption(option =>
            option.setName('tts')
            .setDescription('¿Lo digo en voz alta?')
            .setRequired(false)
            ),
    async execute(Discord, cliente, interaccion){
        var respuesta = interaccion.options.getString('frase')
        var tts = interaccion.options.getBoolean('tts')

        
        if(respuesta.includes('discord.gg') || respuesta.includes('https://')) {
            return await interaccion.reply('*No deberias poner links y/o invitaciones en la frase*')}
        
        if(tts){
            return interaccion.reply({ content: respuesta, tts: true })
        }else{
            return interaccion.reply({ content: respuesta })
        }

    }
}