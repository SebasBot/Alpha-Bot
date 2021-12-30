const {SlashCommandBuilder} = require('@discordjs/builders')

const {gifs, frases} = require('../ArchivosJSON/cohetes.json')

module.exports = {
    name: "cohete",
    data: new SlashCommandBuilder()
        .setName('cohete')
        .setDescription('Lanza fuegos artificiales en el chat')

    ,
    
    async execute(Discord, cliente, interaccion){
     

        var Embed = {
            color: "RANDOM",
            title: frases[Math.floor(Math.random()*frases.length)],
            image: {
                url: gifs[Math.floor(Math.random()*gifs.length)]
            }
        }

        await interaccion.reply({
            embeds:[Embed]
        })


    }
}
