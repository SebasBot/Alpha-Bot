module.exports = async (Discord, cliente, oldMsg, newMsg) => {
  if(oldMsg.author.bot) return
  const MsgEdited = {
    Usuario: oldMsg.author.username + ' #' + oldMsg.author.discriminator,
    PerfilURL: oldMsg.author.avatarURL(),
    ID: oldMsg.author.id,
    CanalID: oldMsg.channel.id,
    Anterior_Mensaje: oldMsg.content.length > 1000 ? 
    '[¡Este mensaje es MUY LARGO!]': oldMsg.content,
    Nuevo_Mensaje: newMsg.content.length > 1000 ? 
      '[¡Este mensaje es MUY LARGO!]': newMsg.content,
    Fecha: Date(),
    Imagen: oldMsg.attachments.first() ?
      oldMsg.attachments.first().proxyURL :
      null
    }
    await cliente.EditSnipes.set(MsgEdited.CanalID, MsgEdited)
    
    console.log('-----------Mensaje Editado-----------')
    console.log(MsgEdited)

}