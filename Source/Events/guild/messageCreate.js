const dotenv = require('dotenv'); dotenv.config

module.exports=(Discord, cliente, message) => {
    if(message.author.bot) return //No bot log
    const MsgCreated = {
        Contenido: message.content,
        Canal:     message.channel.name,
        Usuario:   `${message.author.username}# ${message.author.discriminator}`,
        Server:    message.guild.name,
        Imagen:    message.attachments.first() ?
                    message.attachments.first().proxyURL :
                    null,
        AutorID:  message.author.id,
        Fecha: Date(),

    }

    if(message.guild.id == process.env.GUILDID){
        MsgCreated.rawMsg = message
        console.log(MsgCreated.rawMsg)
        //debuggin somethin :/
    }else{
        console.log('-----------Mensaje Enviado-----------')
        console.log(MsgCreated)
        console.log('-------------------------------------')

    }


}