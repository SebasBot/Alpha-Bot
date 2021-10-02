const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Solicita un avatar')
        .addUserOption(option => 
            option.setName('objetivo').setDescription('El avatar del usuario en cuestión')),
	async execute(interaccion) {       
         var usuario = interaccion.options.getUser('objetivo') || interaccion.member.user;
            const Peticion = new MessageEmbed()
            .setTitle(`Avatar de ${usuario.username}:`)
            .setImage(usuario.displayAvatarURL({size: 4096,dynamic: true, format: 'png'}))
		    .setColor('RANDOM');
    await interaccion.reply({embeds: [Peticion]});
        
	}
};