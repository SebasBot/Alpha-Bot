const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pregunta')
        .setDescription('Responderé a una de tus preguntas')
        .addUserOption(option => 
            option.setName('interrogante').setDescription('la interrogante que desees consultar')),
    async execute(interaccion){
        await interaccion.reply('no, no no, sin RNG no hay diversion :/')
    }
}