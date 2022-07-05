import { Message, TextChannel } from "discord.js"

export default async function (Discord:any, BOT:{[key:string]:any}, oldMsg:Message, newMsg:Message)
{
    if(oldMsg.partial||oldMsg.author.bot) return
    const MsgEdited = 
    {
        Anterior_Mensaje:  oldMsg.content == '' || oldMsg.content.length > 1000 ?
                              '[No se puede mostrar este mensaje]':
                              oldMsg.content,
        Nuevo_Mensaje:     newMsg.content == ''|| newMsg.content.length > 1000 ?
                            '[No se puede mostrar este mensaje]':
                            newMsg.content,
        Usuario:          `${oldMsg.author.tag}`,
        Canal:            (newMsg.channel as TextChannel).name,
        PerfilURL:        oldMsg.author.avatarURL(),
        Imagen:           oldMsg.attachments.first() ?
                            oldMsg.attachments.first()?.proxyURL :
                            null,
        Sticker:          oldMsg.stickers.first()?
                            oldMsg.stickers.first()?.url:
                            null,
        AutorID:          oldMsg.author.id,
        CanalID:          oldMsg.channel.id,
        Fecha:            Date.now()
    }
    await BOT.Edits.set(MsgEdited.CanalID, MsgEdited)  
    console.log('-----------Mensaje Editado-----------')
    console.log(MsgEdited)
    console.log('--------------------------------------')
}
