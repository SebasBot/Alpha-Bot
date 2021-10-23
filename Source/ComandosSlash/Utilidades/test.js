const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    name: "test",
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Pruebas de slash commands'),  
    async execute(Discord, cliente, interaccion){
        await interaccion.reply(`no hay tests`)
    }
}