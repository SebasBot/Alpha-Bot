const {SlashCommandBuilder} = require('@discordjs/builders')
module.exports={
    name: "invitar",
    data: new SlashCommandBuilder()
    .setName('invitar')
    .setDescription('Manda una invitacion del bot'),
    async execute(Discord, cliente, interaccion){
        const nickname  = interaccion.member.user.username

        const objeto = {
            color:"RANDOM",
            author:{
                name:`Ola ${nickname} ¿Por que no me añades a tu server?`
            },
            fields :[
              {
                name: "Esta es la URL/invitacion",
                value:"https://discord.com/api/oauth2/authorize?client_id=854753076664729600&permissions=8&scope=bot%20applications.commands"
              },
              {
              name:"Este es mi server, si deseas aportar algo al bot",
              value:"https://discord.gg/jPgszbRzX5"
               }
            ],
            image: {
                url: "https://c.tenor.com/hyRFiIX7e1sAAAAC/gif-club-penguin-dance.gif"
            }   
        }
        await interaccion.reply({embeds: [objeto], ephemeral: true}) 

    }
}