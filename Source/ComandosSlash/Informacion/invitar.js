const {SlashCommandBuilder} = require('@discordjs/builders')
module.exports={
    name: "invitar",
    data: new SlashCommandBuilder()
    .setName('invitar')
    .setDescription('Responderé a una de tus preguntas'),
    async execute(interaccion){
        const nickname  = interaccion.member.user.username

        const objeto = {
            color:"RANDOM",
            author:{
                name:`${nickname} Ola ¿Por que no me añades a tu server?`
            },
            description: "Esta es la URL/invitacion \n https://discord.com/api/oauth2/authorize?client_id=854753076664729600&permissions=8&scope=bot%20applications.commands",
            image: {
                url: "https://c.tenor.com/hyRFiIX7e1sAAAAC/gif-club-penguin-dance.gif"
            }   


        }
        await interaccion.reply({embeds: [objeto], ephemeral: true}) 


    }
    

}