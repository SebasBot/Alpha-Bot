const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Otorga una lista de comandos disponibles'),  
    async execute(interaccion){
        await interaccion.reply('Te ayudare enseguida cuando tenga una lista disponible')
    }
}