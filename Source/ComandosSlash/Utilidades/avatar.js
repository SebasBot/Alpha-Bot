const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Discord } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Solicita un avatar')
        .addUserOption(option => 
            option.setName('objetivo').setDescription('El avatar del usuario en cuestión')),
	async execute(interaccion) {/*
        const user = interaccion.options.getUser('objetivo');
        console.log(user)
		if (user) return interaccion.reply(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
		return interaccion.reply(`Your avatar: ${interaccion.user.displayAvatarURL({ dynamic: true })}`);
       */
       
       
         var usuario = interaccion.options.getUser('objetivo') || interaccion.member.user;
        

            const Peticion = new MessageEmbed()
            .setTitle(`Avatar de ${usuario.username}:`)
            .setImage(usuario.displayAvatarURL({size: 4096,dynamic: true, format: 'png'}))
		    .setColor('BLACK');
            console.log(Peticion)
    await interaccion.reply({embeds: [Peticion]});
        
	}
};