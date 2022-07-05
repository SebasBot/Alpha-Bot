import { Message, TextChannel } from "discord.js";

export default async function (Discord:any, BOT:any, msgDel:Message)
{
  if(msgDel.partial||msgDel.author.bot) return
  const MsgDeleted:{ [key: string]: any } = {
    Contenido: msgDel.content == '' ||msgDel.content.length > 1000 ?
                '[No se puede mostrar este mensaje]':
                msgDel.content,
    Canal:     (msgDel.channel as TextChannel).name,
    Usuario:   `${msgDel.author.tag}`,
    PerfilURL: msgDel.author.avatarURL(),
    Imagen:    msgDel.attachments.first() ?
                msgDel.attachments.first()?.proxyURL :
                null,
    Sticker:   msgDel.stickers.first()?
                msgDel.stickers.first()?.url:
                null,
    AutorID:   msgDel.author.id,
    CanalID:   msgDel.channel.id,
    Fecha:     Date.now()
  }
  await BOT.Deletes.set(MsgDeleted.CanalID, MsgDeleted)
  console.log('----------Mensaje Eliminado-----------')
  console.log(MsgDeleted)
  console.log('--------------------------------------')
}


