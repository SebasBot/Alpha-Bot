const {SlashCommandBuilder, SlashCommandSubcommandBuilder} = require('@discordjs/builders')

module.exports = {
    name: "stickerurl",
    data: new SlashCommandBuilder()
        .setName('stickerurl')
        .setDescription('Retorna la url de un sticker (y su respectiva imagen)')
        .addStringOption(option=>
            option.setName('id')
            .setDescription('la id del mensaje con sticker')
            .setRequired(true)
            ),
    async execute(Discord, cliente, interaccion){
        var MsgId = interaccion.options.getString('id')
        var channel = interaccion.guild.channels.cache.get(interaccion.channel.id)
        var mensaje = channel.messages
        
        try {
           await mensaje.fetch(MsgId)
            .then(msg =>{
                if(!msg.stickers) return interaccion.reply(`No hay stickers en el mensaje ${MsgId}`)
                interaccion.reply(`id: "${MsgId}" \n URL: ${msg.stickers.first().url}`)
            })
            .catch( e => { 
                console.log(e)
                interaccion.reply('Algo salio mal, No pude encontrar el mensaje')
            })
        } catch (error) {
            console.log(error)            
        }
        
    }
}