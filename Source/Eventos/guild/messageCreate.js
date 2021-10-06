module.exports =(Discord, cliente, message) => {
    console.log('Usuario: '+message.author.username+'#'+message.author.discriminator+': '+message.content)
    console.log('Id: '+message.author.id)
    console.log('En: '+message.guild.name)
    console.log('--------------------------------------')

}