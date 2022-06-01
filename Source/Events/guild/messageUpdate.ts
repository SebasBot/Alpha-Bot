import { Message, TextBasedChannel, TextChannel } from "discord.js"

export default async function (Discord:any, BOT:{[key:string]:any}, oldMsg:Message, newMsg:Message)
{
    if(oldMsg.author.bot) return  
    const MsgEdited = 
    {
        Anterior_Mensaje: oldMsg.content,
        Nuevo_Mensaje:    newMsg.content,
        Usuario:          `${oldMsg.author.username}# ${oldMsg.author.discriminator}`,
        Canal:            (newMsg.channel as TextChannel).name,
        PerfilURL:        oldMsg.author.avatarURL(),
        Imagen:           oldMsg.attachments.first() ?
                            oldMsg.attachments.first()?.proxyURL :
                            null,
        AutorID:          oldMsg.author.id,
        CanalID:          oldMsg.channel.id,
        Fecha:            Date()
    
    }
    if(MsgEdited.Anterior_Mensaje == '' || MsgEdited.Anterior_Mensaje == null)
    {
      MsgEdited.Anterior_Mensaje = '[Este Mensaje esta en blanco]'
    }
  
    if(MsgEdited.Anterior_Mensaje.length >= 1000)
    {
      MsgEdited.Anterior_Mensaje = '[¡Este mensaje es muy largo!]'
    }
  
  
  
    await BOT.Edits.set(MsgEdited.CanalID, MsgEdited)  
    console.log('-----------Mensaje Editado-----------')
    console.log(MsgEdited)
}
