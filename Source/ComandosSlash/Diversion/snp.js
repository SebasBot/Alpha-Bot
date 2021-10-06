const {SlashCommandBuilder} = require('@discordjs/builders')
const {snp} = require('../../index.ts')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('snp')
        .setDescription('Obtengo el mensaje borrado')
        .addBooleanOption(option => 
            option.setName('modo')
            .setDescription('True: eliminado, False: Editado')
            .setRequired(true)),
    async execute(interaccion){
        var Opcion = interaccion.options.getBoolean('modo')
       var snptrue = 0
        Opcion ? await interaccion.reply(
            snptrue
				? {
						embeds: [
							new MessageEmbed()
								.setDescription(snp.content)
								.setAuthor(snp.author.tag)
								.setTimestamp(snp.createdAt),
						],
				  }
				: "¡No hay nada eliminado recientemente!"


        )
        : await interaccion.reply('no hay todavia')
    }
}