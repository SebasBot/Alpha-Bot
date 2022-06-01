import { SlashCommandBuilder } from "@discordjs/builders";
import { BaseCommandInteraction, MessageActionRow, MessageButton } from "discord.js";
export default {
    name: 'avatar',
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('muestra un avatar, meh')
    .addUserOption(option =>
        option
            .setName('objetivo')
            .setDescription('el objetivo')
            .setRequired(false)
        ),
    async execute(Discord:any,BOT:any, Interaction:BaseCommandInteraction)
    {
        let user = Interaction.options.getUser('objetivo')||Interaction.member
        let buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('display_avatar')
                    .setLabel('Avatar')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('display_banner')
                    .setLabel('Banner')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('display_custom_avatar')
                    .setLabel('Avatar Custom')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('display_custom_banner')
                    .setLabel('Banner Custom')
                    .setStyle('SUCCESS'),
            )
        let prev = 0
        let current = 1
        let C_AVATAR = null
        let C_BANNER = null
        let BANNER = null

        

    }
}