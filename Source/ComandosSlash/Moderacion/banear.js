const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    name: "banear",
    data: new SlashCommandBuilder()
        .setName('banear')
        .setDescription('Veta a un usuario temporal o indefinidamente')
        .addUserOption(option => 
            option.setName('usuario').
            setDescription('El objetivo ')
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
    async execute(interaccion){
        const usuario = interaccion.options.getUser('usuario');
        var tiempo = interaccion.options.getNumber('tiempo')
        var razon = interaccion.options.getString('razon')
        if(!tiempo){tiempo = 3}; if(!razon){razon = 'Ningun motivo aparente.'}
        if(!interaccion.user) return interaccion.reply('No posees ')
        let Target = interaccion.guild.members.cache.get(usuario.id)
        Target.ban({days: tiempo, reason: razon})
        .then(()=>{interaccion.reply(
            `Has baneado a ${usuario.username} durante ${tiempo} dias, Motivo: ${razon}` )})
            .catch(err => {
                interaccion.reply(`No pude banear a ${usuario.username}`)
                console.log(err) } )

        
        
    }
}