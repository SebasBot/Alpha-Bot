const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Expulsa a un miembro de manera rapida')
        .addUserOption(option=> 
            option.setName('objetivo')
            .setDescription('La persona a quien desees expulsar')
            .setRequired(true)
            ),  
    async execute(interaccion){
        const objetivo = interaccion.options.getUser('objetivo')
//fetch user and kik

        await interaccion.reply(`Has expulsado a ${objetivo}`)
    }
}