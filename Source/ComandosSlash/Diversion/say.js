const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Puedo repetir lo que dices')
        .addStringOption(option => 
            option.setName('frase').setDescription('Lo que dire por ti.')),
    async execute(interaccion){
        var respuesta = interaccion.options.getString('frase')
        await interaccion.reply(respuesta)
    }
}