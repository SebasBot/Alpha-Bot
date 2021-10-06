const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    name: "expulsar",
    data: new SlashCommandBuilder()
        .setName('expulsar')
        .setDescription('Expulsa a un miembro de manera rapida')
        .addUserOption(option=> 
            option.setName('objetivo')
            .setDescription('La persona a quien desees expulsar')
            .setRequired(true)
            ),  
    async execute(interaccion){
        const objetivo = interaccion.options.getUser('objetivo')
//fetch user and kik

        await interaccion.reply(`Has expulsado a ${objetivo}... ES BAIT jijijija`)
    }
}