const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    name: "golpear",
    data: new SlashCommandBuilder()
        .setName('golpear')
        .setDescription('¡Abofetea a tus amigos!')
        .addUserOption(option => 
            option.setName('usuario').
            setDescription('El objetivo ')
            .setRequired(true)
            ),
    async execute(Discord, cliente, interaccion){
        const receptor = interaccion.options.getUser('usuario')
        const agresor  = interaccion.member.user.username

        
        var Objeto = { 
            color:"RANDOM",
            author:{
                name:`${agresor} ha abofeteado a ${receptor.username} 🖐️💫`
            },
            image: {
                url: "https://c.tenor.com/k4_iBaFWIAYAAAAC/slapping.gif"
            }        
        }

        if(agresor==receptor.username){
            Objeto.footer = {
                text: 'El tipo esta golpeando la causa de sus problemas'}
        }

        await interaccion.reply({embeds: [Objeto]})
    }
}