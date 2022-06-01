import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'

export default {
    name: "snp",
    data: new SlashCommandBuilder()
        .setName('snp')
        .setDescription('Envio un mensaje editado o eliminado')
        .addStringOption(option => 
            option
                .setName('modo')
                .setDescription('Retorna el tipo de mensaje modificado')
                .addChoices([['Eliminado', 'deleted'],['Editado', 'edited']])
                .setRequired(true)
            ),
    async execute(Discord:any, BOT:any, Interaction:any){
      const deleted_msg = BOT.Deletes.get(Interaction.channel.id)
      const edited_msg = BOT.Edits.get(Interaction.channel.id)
      const Opcion = Interaction.options.getString('modo')

      if(!Interaction.guild?.me?.permissions.has('VIEW_CHANNEL'))
      {
          return Interaction.reply({ 
              content:"Asegurate de que tenga el permiso 'Ver canal'",
          })
      }

      switch (Opcion)
      {
        case 'deleted':
            await Interaction.reply(
                deleted_msg ?
                {
                embeds:[ 
                    new MessageEmbed()
                    .addField('Mensaje Borrado', deleted_msg.Contenido, true)
                    .setAuthor({name: deleted_msg.Usuario, iconURL: deleted_msg.PerfilURL})
                    .setColor('NOT_QUITE_BLACK')
                    .setTimestamp(deleted_msg.Fecha)
                    .setImage(deleted_msg.Imagen)              
                ]
                }
                :'No hay nada eliminado recientemente'
            )
        break;
        case 'edited':
            await Interaction.reply(
             edited_msg?
                {
                embeds: [
                    new MessageEmbed()              
                    .addField('Mensaje Editado', edited_msg.Anterior_Mensaje,true)
                    .setAuthor({name: edited_msg.Usuario, iconURL: edited_msg.PerfilURL })
                    .setColor('WHITE')
                    .setTimestamp(edited_msg.Fecha)
                    .setImage(edited_msg.Imagen)
                ]
                }
                :"¡No hay nada editado recientemente"
            )
        break;
      }
    }
}