const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('¡Abofetea a tus amigos!'),  
    async execute(interaccion){
        await interaccion.reply('Todavia no, ten paciencia...')
    }
}