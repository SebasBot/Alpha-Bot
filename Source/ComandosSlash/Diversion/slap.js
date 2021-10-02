const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('¡Abofetea a tus amigos!')
        .addUserOption(option => 
            option.setName('usuario').
            setDescription('El objetivo ')
            .setRequired(true)
            ),
    async execute(interaccion){
        const receptor = interaccion.options.getUser('usuario')
        const agresor  = interaccion.member.user.username
        var Objeto = { 
            color:"RANDOM",
            author:{
                name:`${agresor} ha abofeteado a ${receptor.username}`
            },
            image: {
                url: "https://c.tenor.com/k4_iBaFWIAYAAAAC/slapping.gif"
            }        
        }


        await interaccion.reply({embeds: [Objeto]})
    }
}