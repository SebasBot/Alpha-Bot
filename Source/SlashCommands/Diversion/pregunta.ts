import { SlashCommandBuilder } from '@discordjs/builders'
import { BaseCommandInteraction, CommandInteractionOptionResolver, MessageEmbed } from 'discord.js'

export default {
    name: "pregunta",
    data: new SlashCommandBuilder()
        .setName('pregunta')
        .setDescription('Responderé a una de tus preguntas')
        .addStringOption(option => 
            option.setName('interrogante')
            .setDescription('la interrogante que desees consultar')
            .setRequired(true)),

    async execute(Discord:any, BOT:any, Interaction:BaseCommandInteraction){
        var pregunta = (Interaction.options as CommandInteractionOptionResolver)
            .getString('interrogante')
        const respuestas = ['Jajajaja','No vuelvas a preguntar eso','Si. 👍', '...' ,'Puede ser','No. 👎', 'Es posible. 🤔', 'Nunca. 😄', 'Definitivamente. 👌', 'Mejor pregunta otra cosa. 😅']
        const RNG = Math.floor(Math.random() * respuestas.length)
        const Bola8 = new MessageEmbed() // create embed 
        .setAuthor({name:'🎱 La Bola 8 dice...'})
        .setColor('ORANGE').addField('Pregunta:', (pregunta as string))
        .addField('Respuesta:', respuestas[RNG]);
        await Interaction.reply({embeds: [Bola8]})
    }
}