const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Pruebas de slash commands'),  
    async execute(interaccion){
        await interaccion.reply(`no hay tests`)
    }
}