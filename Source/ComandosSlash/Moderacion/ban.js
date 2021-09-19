const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Veta a un usuario de manera indefinida')
        .addUserOption(option => 
            option.setName('usuario').setDescription('el objetivo')),
    async execute(interaccion){
        var usuario = interaccion.options.getUser('usuario')
        if(!usuario) return await interaccion.reply('no has seleccionado a nadie')
       
        
        await interaccion.reply(`Has baneado a ${usuario}... Ah no se crea joven, todavia no esta construido el comando xd`)
    }
}