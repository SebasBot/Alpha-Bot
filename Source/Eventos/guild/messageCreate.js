module.exports=(Discord, cliente, message) => {
    const MsgCreated = {
        Usuario: message.author.username + ' #' + message.author.discriminator,
        ID: message.author.id,
        Contenido: message.content,
        Canal:message.channel.name,
        Server: message.guild.name
    }


    
    console.log('-----------Mensaje Enviado-----------')
    console.log(MsgCreated)
    console.log('--------------------------------------')

}