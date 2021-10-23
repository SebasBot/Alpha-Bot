module.exports = async (Discord, cliente, msgDel) =>{
  
  const MsgDeleted = {
    Usuario: msgDel.author.username + ' #' + msgDel.author.discriminator,
    PerfilURL: msgDel.author.avatarURL(),
    ID: msgDel.author.id,
    CanalID: msgDel.channel.id,
    Contenido: msgDel.content,
    Fecha: Date(),
    Imagen: msgDel.attachments.first() ?
    msgDel.attachments.first().proxyURL :
    null
  }
  
  
  await cliente.Snipes.set( MsgDeleted.CanalID, MsgDeleted)
  
  console.log('----------Mensaje Eliminado-----------')
  console.log(MsgDeleted)
  console.log('--------------------------------------')
  
}