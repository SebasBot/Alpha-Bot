import { SlashCommandBuilder } from '@discordjs/builders'
import { Message } from 'discord.js'

export default {
    name: "stickerurl",
    data: new SlashCommandBuilder()
        .setName('stickerurl')
        .setDescription('Retorna la url de un sticker (y su respectiva imagen)')
        .addStringOption(option=>
            option.setName('id')
            .setDescription('la id del mensaje con sticker')
            .setRequired(true)
            ),
    async execute(Discord:any, BOT:any, Interaction:any){
        var MsgId = Interaction.options.getString('id')
        var channel = Interaction.guild.channels.cache.get(Interaction.channel.id)
        var mensaje = channel.messages
        await mensaje.fetch(MsgId)
            .then((msg:Message) =>{
                if(!msg.stickers) return Interaction.reply(`No hay stickers en el mensaje ${MsgId}`)
                Interaction.reply(`id: "${MsgId}" \n URL: ${msg.stickers.first()?.url}`)
            })
            .catch( (e:any) => { 
                console.log(e)
            })
    }
}