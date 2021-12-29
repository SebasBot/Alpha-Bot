const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    name: "besar",
    data: new SlashCommandBuilder()
        .setName('besar')
        .setDescription('Das un besito ¡Que tierno!')
        .addUserOption(option => 
            option.setName('usuario').
            setDescription('El afortunado')
            .setRequired(true)
            ),
    async execute(Discord, cliente, interaccion){
        const receptor = interaccion.options.getUser('usuario')
        const afortunado  = interaccion.member.user.username

        if(receptor.username == afortunado) return interaccion.reply('¿Te puedes besar a ti mismo? WTF')
        
        var Objeto = { 
            color:"RANDOM",
            author:{
                name:`${afortunado} le ha dado un besito a ${receptor.username} 😘`
            },
            image: {
                url: "https://media.giphy.com/media/v4JbTGe4KJjKo/giphy.gif"
            }        
        }


        await interaccion.reply({embeds: [Objeto]})
    }
}