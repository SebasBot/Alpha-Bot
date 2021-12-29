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
        .addNumberOption(option => 
                option.setName('tiempo').
                setDescription('El tiempo de la penalización (en dias)')
                .setRequired(false)
            )
        .addStringOption(option => 
                option.setName('razon').
                setDescription('La causa del ban')
                .setRequired(false)
                ),
    async execute(Discord, cliente, interaccion){
        if(!interaccion.memberPermissions.has('BAN_MEMBERS')) return interaccion.reply('No puedes BANEAR a ningun usuario, fuera de mi vista')
        
        const usuario = interaccion.options.getUser('usuario');
        var tiempo = interaccion.options.getNumber('tiempo')
        var razon = interaccion.options.getString('razon')
        if(!tiempo){tiempo = 3}; if(!razon){razon = 'Ningun motivo aparente.'}
        
        
        let Target = interaccion.guild.members.cache.get(usuario.id)
        await Target.ban({days: tiempo, reason: razon})
        .then(()=>{interaccion.reply(
            `Has baneado a ${usuario.username} Motivo: ${razon}` )})
            .catch(err => {
                interaccion.reply({content:`No pude banear a ${usuario.username}, simplemente algo salio mal` , ephemeral: true })
                console.log(err) } )
       
    }
}