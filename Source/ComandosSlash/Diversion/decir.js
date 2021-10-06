const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('decir')
        .setDescription('Puedo repetir lo que dices')
        .addStringOption(option => 
            option.setName('frase').setDescription('Lo que dire por ti.').setRequired(true)),
    async execute(interaccion){
        var respuesta = interaccion.options.getString('frase')
        await interaccion.reply(respuesta)
    }
}