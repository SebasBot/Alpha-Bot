const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    name: "expulsar",
    data: new SlashCommandBuilder()
        .setName('expulsar')
        .setDescription('Expulsa a un miembro de manera rapida')
        .addUserOption(option=> 
            option.setName('objetivo')
            .setDescription('La persona a quien desees expulsar')
            .setRequired(true)
            ),  
    async execute(Discord, cliente ,interaccion){

        if(!interaccion.memberPermissions.has('KICK_MEMBERS')) return interaccion.reply('No puedes EXPULSAR a ningun usuario, fuera de mi vista')
        const objetivo = interaccion.options.getUser('objetivo')
        let Target = interaccion.guild.members.cache.get(objetivo.id)
        Target.kick('Fue expulsado por un Moderador')
            .then(()=>{
                await interaccion.reply(`Has expulsado a ${Target.name}...`)
            }).catch(err=>{
                await interaccion.reply(`No pude expulsar a ${Target.name}, simplemente algo salio mal`)
            })

        
    }
}