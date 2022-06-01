import { Client, Message, TextChannel } from "discord.js";

export default function(Discord:any, BOT:Client, message:Message)
{
    if(message.author.bot)return
    const MsgCreated = {
        Contenido: message.content,
        Canal:     (message.channel as TextChannel).name,
        Usuario:   `${message.author.username}# ${message.author.discriminator}`,
        Server:    message.guild?.name,
        Imagen:    message.attachments.first() ?
                    message.attachments.first()?.proxyURL:
                    null,
        AutorID:  message.author.id,
        Fecha: Date(),
    }
    console.log('-----------Mensaje Enviado-----------')
    console.log(MsgCreated)
    console.log('-------------------------------------')
}