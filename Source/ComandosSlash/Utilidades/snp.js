const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: "snp",
    data: new SlashCommandBuilder()
        .setName('snp')
        .setDescription('Envio un mensaje editado o eliminado')
        .addStringOption(option => 
            option.setName('modo')
            .setDescription('Retorna el tipo de mensaje modificado')
            .addChoices([['Eliminado', 'deleted'],['Editado', 'edited']])
            .setRequired(true)),
    async execute(Discord, cliente, interaccion){
      const deleted_msg = cliente.Snipes.get(interaccion.channel.id)
      const edited_msg = cliente.EditSnipes.get(interaccion.channel.id)
      const Opcion = interaccion.options.getString('modo')

      switch (Opcion){
        case 'deleted':
          await interaccion.reply(
            deleted_msg ?
            {
              embeds:[ 
                new MessageEmbed()
                  .addField('Mensaje Borrado', deleted_msg.Contenido, true)
                  .setAuthor(deleted_msg.Usuario, deleted_msg.PerfilURL)
                  .setColor('NOT_QUITE_BLACK')
                  .setTimestamp(deleted_msg.Fecha)
                  .setImage(deleted_msg.Imagen)              
              ]
            }
            :'No hay nada eliminado recientemente'
            )
          break;
        case 'edited':
          await interaccion.reply(
            edited_msg?
            {
              embeds: [
                new MessageEmbed()              
                  .addField('Mensaje Editado', edited_msg.Anterior_Mensaje,true)
                  .setAuthor(edited_msg.Usuario, edited_msg.PerfilURL)
                  .setColor('WHITE')
                  .setTimestamp(edited_msg.Fecha)
                  .setImage(edited_msg.Imagen)
              ]
            }
            : "¡No hay nada editado recientemente"
            )
          break;
      }
    }
}