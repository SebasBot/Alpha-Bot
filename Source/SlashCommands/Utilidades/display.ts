import { SlashCommandBuilder } from '@discordjs/builders';
import { BaseCommandInteraction, CommandInteractionOptionResolver, GuildMember, MessageEmbed, User } from 'discord.js';

export default {
    name: "display",
	data: new SlashCommandBuilder()
		.setName('display')
		.setDescription('Solicita un avatar, un banner o un avatar personalizado de un usuario')
        .addStringOption(option => 
            option
                .setName('opcion')
                .setDescription('Lo que quieres mostrar')
                .setRequired(true)
                .addChoices(
                    [
                    ['Avatar'           ,'avatar'],
                    ['Custom Avatar'    ,'custom avatar'],
                    ['Banner'           ,'banner']
                    ]
                )
        )
        .addUserOption(option =>
            option
                .setName('usuario')
                .setDescription('El Usuario objetivo')    
        )
        ,
	async execute(Discord:any, BOT:any, Interaction:BaseCommandInteraction) {       
        var OPTIONS = (Interaction.options as CommandInteractionOptionResolver).getString('opcion')
        var USER =    Interaction.options.getUser('usuario') || Interaction.member?.user;

        var Target = Interaction.guild?.members.cache.get((USER as User).id)

        const MsgEmbed: {[key: string]: any}  = {
            color: 'RANDOM',
            title: `El ${OPTIONS} de ${(Target as GuildMember).nickname || (USER as User).username}:`,
            image: { 
                url: ''
            }

        }

        switch (OPTIONS) {
            case 'avatar':
                MsgEmbed.image.url = `${
                    (USER as User).displayAvatarURL(
                        {
                            size: 4096, 
                            dynamic: true, 
                            format: 'png' 
                        }
                    )}`;
                break;
            case 'custom avatar':
                MsgEmbed.image.url = `${
                    (Target as GuildMember).displayAvatarURL(
                        {
                            size: 4096, 
                            dynamic: true, 
                            format: 'png' 
                        }
                    )}`
                break;
            case 'banner':
                let fetch = await Interaction.client.users.fetch((Target as GuildMember).id, {force: true})
                        .then((user:User) =>{
                            let banner = user.bannerURL(
                                {
                                    dynamic: true, 
                                    format: 'png', 
                                    size: 4096
                                }
                            )
                            if(!banner)
                            {
                                return Interaction.reply('Este usuario no posee un banner');
                            }
                            MsgEmbed.image.url = 
                                `${banner}`
                        })
                        .catch(()=>console.error())
                break;
        }
    await Interaction.reply({embeds: [MsgEmbed]});      
	}
};