const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Expulsa a un miembro de manera rapida'),  
    async execute(interaccion){
        await interaccion.reply('ni siquiera hay opcion de a quien expulsar, doe')
    }
}