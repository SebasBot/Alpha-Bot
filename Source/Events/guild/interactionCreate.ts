import { BaseCommandInteraction, TextChannel } from "discord.js";

export default async function (Discord:any, BOT:{[key:string]:any}, interaction:BaseCommandInteraction)
{
    if (!interaction.isCommand()) return;
    const slashName = BOT.SlhCommands.get(interaction.commandName);
    const INTERACTION_LOG = BOT.Logs.get(interaction.guild?.id)

    if(!slashName) return;

    await slashName.execute(Discord, BOT, interaction)
        .then(()=>
        {
            if(!INTERACTION_LOG)
            {
                return console.log('No hay ningun canal para hacer un registro')
            }
            var message:{[key:string]:any} = 
                {
                    color: 'RANDOM',
                    title: `por el usuario ${interaction.user.username}#${interaction.user.discriminator}`,
                    author: {name: `Interaccion creada en #${(interaction.channel as TextChannel).name}`},
                    description: `Comando /${interaction.commandName}`,
                    fields: [],
                    footer: `a las ${interaction.createdAt}`
                }
            
            interaction.options.data.forEach((params)=>{
                message.fields.push(
                    {
                        name:`${params.name}`,
                        value: `\`\`\`\nTipo: ${params.type}\nContenido: ${params.value}\n\`\`\``,
                    }
                    )
            })
            INTERACTION_LOG.send
            (
                {
                    embeds: [
                        message
                    ]
                }
            ).then(()=>console.log(`registro creado en ${INTERACTION_LOG.name}`))
            .catch((e:any)=>{console.log(e);console.log('falló')})
        })
        .catch((e:any)=>console.log(e))

}