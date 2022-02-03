const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    name: "banear",
    data: new SlashCommandBuilder()
        .setName('banear')
        .setDescription('Veta a un usuario temporal o indefinidamente')
        .addUserOption(option => 
            option.setName('usuario')
            .setDescription('El objetivo ')
            .setRequired(true)
            )
        .addStringOption(option => 
                option.setName('razon').
                setDescription('La causa del ban')
                .setRequired(false)
                ),
    async execute(Discord, cliente, interaccion){
        if(!interaccion.memberPermissions.has('BAN_MEMBERS')) return interaccion.reply('No puedes BANEAR a ningun usuario, fuera de mi vista')
        
        const usuario = interaccion.options.getUser('usuario');
        var tiempo = 3
        var razon = interaccion.options.getString('razon')
         if(!razon){razon = 'Ningun motivo aparente'}
                 
        let Target = interaccion.guild.members.cache.get(usuario.id)
        
        await Target.ban({days: tiempo, reason: razon})
        .then(()=>{

            interaccion.reply(
            `Has baneado a ${usuario.username} Motivo: ${razon}`)
        })
        .catch(err => {
            interaccion.reply({content:`No puedo banear a ${usuario.username}, algo salio mal` , ephemeral: true })
            console.log(err)})
       
    }
}