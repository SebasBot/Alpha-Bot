import { SlashCommandBuilder } from '@discordjs/builders'
import { BaseCommandInteraction, CommandInteractionOptionResolver } from 'discord.js'

export default {
    name: "decir",
    data: new SlashCommandBuilder()
        .setName('decir')
        .setDescription('Puedo repetir lo que dices')
        .addStringOption(option => 
            option.setName('frase')
            .setDescription('Lo que dire por ti.')
            .setRequired(true))
            ,
    async execute(Discord:any, BOT:any, Interaction:BaseCommandInteraction){
        var respuesta= (Interaction.options as CommandInteractionOptionResolver).getString('frase')
        var _respuesta_:string = respuesta? respuesta.toLowerCase():'Respuesta Invalida' 
 
        const Dictionary = ['<@&','discord.gg','negros','nig','mexichango','cp','cepe','papul','@everyone','@here','https://','http']
        
        function checkWord( Args:string, BLOCKED_WORDS:string[] )
        {
            for( let word of BLOCKED_WORDS)
            {
                if(Args.includes(word)) return true        
            }
            return false
        }

        if(_respuesta_.length >= 100 || checkWord(_respuesta_, Dictionary) )
        {
            //Si la funcion encuentra una mala palabra o tiene mas de 100 caracteres...
            return Interaction.reply(
                {
                    content:'**No puedo enviar ese mensaje, va contra mis normas**', ephemeral: true
                }
            )
        }
        Interaction.reply(
            {
                content:'El mensaje que has enviado es:', 
                ephemeral: true
            }
        )

        await Interaction.channel?.send(
            { 
                content: respuesta 
            }
        )
    }
}