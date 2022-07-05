import { SlashCommandBuilder } from '@discordjs/builders'
import { BaseCommandInteraction, CommandInteractionOptionResolver, Emoji, GuildEmoji, MessageEmbed } from 'discord.js'

export default {
    name: "snipe",
    data: new SlashCommandBuilder()
        .setName('snipe')
        .setDescription('Encuentro un mensaje editado o borrado, tambien busco reacciones')
        .addStringOption(option => 
            option
                .setName('modo')
                .setDescription('Retorna el mensaje o reaccion modificado')
                .addChoices([['Eliminado', 'deleted'],['Editado', 'edited'],['Reaccion','reactioned']])
                .setRequired(true)
            ),

    async execute(Discord:any, BOT:any, Interaction:BaseCommandInteraction){
      const deleted_msg     = BOT.Deletes.get(Interaction.channel?.id)
      const edited_msg      = BOT.Edits.get(Interaction.channel?.id)
      const reactionRemoved = BOT.Reaction.get(Interaction.channel?.id)
      const Opcion          = (Interaction.options as CommandInteractionOptionResolver).getString('modo')

      if(!Interaction.guild?.me?.permissions.has('VIEW_CHANNEL'))
      {
          return Interaction.reply({ 
              content:"Asegurate de que tenga el permiso 'Ver canal'",
              files: ["https://cdn.discordapp.com/attachments/911316224007348274/988277442672214036/unknown.png"],
              ephemeral: true
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
                    .setThumbnail(deleted_msg.Sticker)           
                ]
                }
                :'¡No hay nada eliminado recientemente!'
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
                    .setThumbnail(edited_msg.Sticker)
                ]
                }
                :"¡No hay nada editado recientemente!"
            )
        break;
        case 'reactioned':
            function formatEmoji(emoji:Emoji|GuildEmoji){
                let check = emoji.animated?'<a:':'<:'
                return (emoji as GuildEmoji).available?
                    emoji.toString():
                    `${[check,emoji.name,':',emoji.id,'>'].toString()}`
                //Podria ser mejor, supongo
            }

            await Interaction.reply(
                reactionRemoved?
                   {
                   embeds: [
                       new MessageEmbed()              
                       .addField(
                           'Reaccion removida',
                            `${formatEmoji(reactionRemoved.emoji)}`,
                            true
                        )
                       .setAuthor({name: reactionRemoved.user, iconURL: reactionRemoved.iconURL })
                       .setColor('GREY')
                       .setTimestamp(reactionRemoved.createdAt)
                       .setThumbnail(reactionRemoved.emoji.url)
                   ]
                   }
                   :"¡No encontre ninguna reacción recientemente!"
               )


        break;
      }
    }
}