const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageEmbed}=require('discord.js')
module.exports = {
    name: "pregunta",
    data: new SlashCommandBuilder()
        .setName('pregunta')
        .setDescription('Responderé a una de tus preguntas')
        .addStringOption(option => 
            option.setName('interrogante')
            .setDescription('la interrogante que desees consultar')
            .setRequired(true)),

    async execute(Discord, cliente, interaccion){
        var pregunta = interaccion.options.getString('interrogante')
        const respuestas = ['Si. 👍', 'No. 👎', 'Es posible. 🤔', 'Nunca. 😄', 'Definitivamente. 👌', 'Mejor pregunta otra cosa. 😅']
        const RNG = Math.floor(Math.random() * respuestas.length)
        
        const Bola8 = new MessageEmbed() // create embed 
        .setAuthor('🎱 La Bola 8 dice...')
        .setColor('ORANGE').addField('Pregunta:', pregunta)
        .addField('Respuesta:', respuestas[RNG]);
        await interaccion.reply({embeds: [Bola8]})
    }
}