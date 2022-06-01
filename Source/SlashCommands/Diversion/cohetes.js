const {SlashCommandBuilder} = require('@discordjs/builders')

const {cohete_gifs, cohete_frases} = require('../ArchivosJSON/miscelany.json')

module.exports = {
    name: "cohete",
    data: new SlashCommandBuilder()
        .setName('cohete')
        .setDescription('Lanza fuegos artificiales en el chat')

    ,
    
    async execute(Discord, cliente, interaccion){
     
        var Embed = {
            color: "RANDOM",
            title: cohete_frases[Math.floor(Math.random()*cohete_frases.length)],
            image: {
                url: cohete_gifs[Math.floor(Math.random()*cohete_gifs.length)]
            }
        }

        await interaccion.reply({
            embeds:[Embed]
        })


    }
}
