const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    name: "helado",
    data: new SlashCommandBuilder()
        .setName('helado')
        .setDescription('¡Ofrece un helado!')
        .addUserOption(option => 
            option.setName('usuario').
            setDescription('El convidado')
            .setRequired(true)
            ),
    async execute(Discord, cliente, interaccion){
        const receptor = interaccion.options.getUser('usuario')
        const emisor  = interaccion.member.user.username
        var Objeto = { 
            color:"RANDOM",
            author:{
                name:`¡${emisor} ha dado helado a ${receptor.username}! `
            },
            image: {
                url: "https://c.tenor.com/YazlxXEYNnEAAAAd/pico-boku-no-pico.gif"
            }        
        }


        await interaccion.reply({embeds: [Objeto]})
    }
}