import { Message, TextChannel } from "discord.js";

export default async function (Discord:any, BOT:any, msgDel:Message)
{
  if(msgDel.author.bot) return
  const MsgDeleted:{ [key: string]: any } = {
    Contenido: msgDel.content,
    Canal:     (msgDel.channel as TextChannel).name,
    Usuario:   `${msgDel.author.username}# ${msgDel.author.discriminator}`,
    PerfilURL: msgDel.author.avatarURL(),
    Imagen:    msgDel.attachments.first() ?
                msgDel.attachments.first()?.proxyURL :
                null,
    AutorID:   msgDel.author.id,
    CanalID:   msgDel.channel.id,
    Fecha:     Date()

  }

  if(MsgDeleted.Contenido == null || MsgDeleted.Contenido == '')
  {
    MsgDeleted.Contenido = '[No hay ningun mensaje]'
  }

  if(MsgDeleted.Contenido > 1000)
  {
    MsgDeleted.Contenido = '[Este mensaje es muy largo!]'      
  }

  await BOT.Deletes.set(MsgDeleted.CanalID, MsgDeleted)

   console.log('----------Mensaje Eliminado-----------')
  console.log(MsgDeleted)
  console.log('--------------------------------------')

}


