import { SlashCommandBuilder } from "@discordjs/builders";
import { BaseCommandInteraction, CommandInteractionOptionResolver } from "discord.js";

export default 
{
    name: 'rolelist',
    data:   new SlashCommandBuilder()
        .setName('rolelist')
        .setDescription('Crea un embed con roles en una lista para tus usuarios')
        //1
        .addRoleOption
            (
                option =>
                    option.setName('rol1')
                    .setDescription('El rol que obtendran tus usuarios')
                    .setRequired(true)
            )
        .addStringOption
        (
            option =>
                option.setName('descripcion1')
                .setDescription('La descripcion que deseas ponerle al rol obtenible')
                .setRequired(true)
        )
        //2
        .addRoleOption
        (
            option =>
                option.setName('rol2')
                .setDescription('El rol que obtendran tus usuarios')
                .setRequired(false)
        )
        .addStringOption
        (
            option =>
                option.setName('descripcion2')
                .setDescription('La descripcion que deseas ponerle al rol obtenible')
                .setRequired(false)
        )
        //3
        .addRoleOption
        (
            option =>
                option.setName('rol3')
                .setDescription('El rol que obtendran tus usuarios')
                .setRequired(false)
        )
        .addStringOption
        (
            option =>
                option.setName('descripcion3')
                .setDescription('La descripcion que deseas ponerle al rol obtenible')
                .setRequired(false)
        )
        //4
        .addRoleOption
        (
            option =>
                option.setName('rol4')
                .setDescription('El rol que obtendran tus usuarios')
                .setRequired(false)
        )
        .addStringOption
        (
            option =>
                option.setName('descripcion4')
                .setDescription('La descripcion que deseas ponerle al rol obtenible')
                .setRequired(false)
        )
        //5
        .addRoleOption
        (
            option =>
                option.setName('rol5')
                .setDescription('El rol que obtendran tus usuarios')
                .setRequired(false)
        )
        .addStringOption
        (
            option =>
                option.setName('descripcion5')
                .setDescription('La descripcion que deseas ponerle al rol obtenible')
                .setRequired(false)
        )
        //
        .addChannelOption
        (
            option =>
                option.setName('canal')
                .setDescription('el canal externo donde deseas colocar tu embed')
                .setRequired(false)
        ),
    async execute(Discord:any, BOT:any, Interaction:BaseCommandInteraction)
    {       
        Interaction.options.data.forEach((value, index, array) =>
        {
            console.log(value)
            console.log(index)
            console.log(array)
        }
        )
        Interaction.reply('lol').then(()=>{setTimeout(()=>{},5000);Interaction.deleteReply()})
    }
}