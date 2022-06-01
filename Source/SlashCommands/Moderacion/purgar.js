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
        if(cantidad>100) return interaccion.reply('No puedes eliminar más de 100 mensajes')

        if(!interaccion.memberPermissions.has('MANAGE_MESSAGES')) return interaccion.reply('No tienes permiso de purgar mensajes')
        
        await interaccion.channel.bulkDelete(cantidad, true)
            .then(mensajes=>{
                console.log(mensajes)
                interaccion.reply({content: `Se han eliminado ${mensajes.size} mensaje(s) 🧻`, ephemeral: true })
            })
            .catch(err=>{
                console.log(err)
                interaccion.reply({content: `No se pudo eliminar esa cantidad de mensajes, lo siento.`, ephemeral: true})
            })


    }
}