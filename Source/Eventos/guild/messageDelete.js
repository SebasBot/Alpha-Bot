module.exports = async (Discord, cliente, msgDel) =>{
  if(msgDel.author.bot) return
  const MsgDeleted = {
    Contenido: msgDel.content,
    Canal:     msgDel.channel.name,
    Usuario:   `${msgDel.author.username}# ${msgDel.author.discriminator}`,
    PerfilURL: msgDel.author.avatarURL(),
    Imagen:    msgDel.attachments.first() ?
                msgDel.attachments.first().proxyURL :
                null,
    AutorID:   msgDel.author.id,
    CanalID:   msgDel.channel.id,
    Fecha:     Date()

  }

  if(MsgDeleted.Contenido == null || MsgDeleted.Contenido == ''){
    MsgDeleted.Contenido = '[No hay ningun mensaje]'
  }

  if(MsgDeleted.Contenido > 1000){
    MsgDeleted.Contenido = '[¡Este mensaje es muy largo!]'
  }

  await cliente.Snipes.set( MsgDeleted.CanalID, MsgDeleted )

  console.log('----------Mensaje Eliminado-----------')
  console.log(MsgDeleted)
  console.log('--------------------------------------')
  
}