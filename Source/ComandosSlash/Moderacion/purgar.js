const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports={
    name:"purgar",
    data: new SlashCommandBuilder()
        .setName('purgar')
        .setDescription('Elimina mensajes en masa')
        .addIntegerOption(option =>
            option.setName('cantidad')
            .setDescription('La cantidad de mensajes que quieres eliminar (No debe superar mas de 2 semanas)')
            .setRequired(true)
            ),
    async execute(cliente, Discord, interaccion){
        var cantidad = interaccion.options.getInteger('cantidad')
        if(cantidad>1000) return interaccion.reply('No puedes eliminar más de 1000 mensajes')

        if(!interaccion.memberPermissions.has('MANAGE_MESSAGES')) return interaccion.reply('No tienes permiso de purgar mensajes')
        
        await interaccion.channel.bulkDelete(cantidad, true)
            .then(mensajes=>{
                console.log(mensajes)
                interaccion.reply(`Se han eliminado ${mensajes.size} mensaje(s) 🧻`)
            })
            .catch(err=>{
                interaccion.reply(`No se ha podido eliminar mensajes, es probable que los mensajes sean muy antiguos`)
            })


    }
}