const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    name: "test",
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Pruebas de slash commands')
        .addStringOption(option=>
            option.setName('un')
            .setDescription('numero')
            
            .addChoices([['uno', 'one'],['dos','two']])
            )
,
    async execute(Discord, cliente, interaccion){
        var number = interaccion.options.getString('un')
        if(number){
            console.log(number)
            return interaccion.reply(`numero ${number}`)
            
        }
        await interaccion.reply(`no hay tests`)
    }
}