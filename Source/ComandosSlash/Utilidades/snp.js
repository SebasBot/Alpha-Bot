const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: "snp",
    data: new SlashCommandBuilder()
        .setName('snp')
        .setDescription('Envio un mensaje editado o eliminado')
        .addBooleanOption(option => 
            option.setName('modo')
            .setDescription('True: Eliminado, False: Editado')
            .setRequired(true)),
    async execute(Discord, cliente, interaccion){
      const snptrue = cliente.Snipes.get(interaccion.channel.id)
      const snpfalse = cliente.EditSnipes.get(interaccion.channel.id)
      const Opcion = interaccion.options.getBoolean('modo')

        Opcion ? await interaccion.reply(
          snptrue? 
            {
					  embeds: [
						new MessageEmbed()
							.addField('Mensaje Borrado',snptrue.Contenido,true)
							.setAuthor(snptrue.Usuario, snptrue.PerfilURL)
							.setColor('BLACK')
							.setTimestamp(snptrue.Fecha),
					  ],
				    }
				  : "¡No hay nada eliminado recientemente!" )
        : await interaccion.reply(
         snpfalse?
                 {
                    embeds: [
                      new MessageEmbed()              
                        .addField('Mensaje Editado',snpfalse.Anterior_Mensaje,true)
                        .setAuthor(snpfalse.Usuario, snpfalse.PerfilURL)
                        .setColor('WHITE')
                        .setTimestamp(snpfalse.Fecha)
                    ]
                  }
          :"¡No hay nada editado recientemente")
    }
}