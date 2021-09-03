const {Prefix} = require('../../index')
const {MessageEmbed} = require('discord.js')
module.exports = {
	name: 'help',
	description: 'Enlista la informacion de los comandos disponibles',
	aliases: ['commands'],
	usage: '[nombre del comando]',
	cooldown: 5,
	execute(message, args) {
        const data = [];
        const {commands} = message.client;
        console.log(args.lenght)
         if(!args[0]){
            data.push('Aqui tiene una lista de todos mis comandos');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nPuedes enviar \`${Prefix}help [comando]\` para obtener informacion especifica sobre cualquier accion`);
            
            var HelpFalseargs = new MessageEmbed()
            .setTitle('Ayuda de Alpha-Bot')
            .setDescription(data[2])
            .addField(data[0],data[1])
            .setColor('WHITE')
            //Cualquier imagen es valida
            .setImage('https://thumbs.dreamstime.com/z/d-penguin-chatting-mobile-phone-render-using-46594129.jpg')

            return message.author.send(HelpFalseargs)
                 .then(()=>{
                    if (message.channel.type === 'dm') return;
					message.reply('¡Te he enviado un mensaje privado!');
                 })
                 .catch(error=>{
					console.error(`No pude enviar mensaje a ${message.author.tag}.\n`, error);
					message.reply('Al parecer no puedo enviarte mensajes privados...');
				});
        }
        const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('comando invalido o inexistente');
		}
        


		data.push(`**Nombre:** ${command.name}`);

		if (command.aliases) data.push(`**Alias:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Descripcion:** ${command.description}`);
		if (command.usage) data.push(`**Uso:** ${Prefix}${command.name} ${command.usage}`);

		data.push(`**Enfriamiento:** ${command.cooldown || 3} segundos(s)`);
        console.log(data)
        var HelpTrueargs = new MessageEmbed()
        .setTitle(data[0])
        .setDescription(data[1]+
            '\n' + data[2] + 
            '\n' + data[3] +
            '\n' + data[4])
        .setColor('WHITE')
        //Cualquier imagen es valida
        .setImage('https://media.istockphoto.com/photos/3d-academic-penguin-looks-through-a-magnifying-glass-picture-id523828725?k=6&m=523828725&s=170667a&w=0&h=Ot3CPlL5QgTCH5fVI7q6MraoyYHOUtQueVj-qYnSlkU=')
        console.log(data)



		message.channel.send(HelpTrueargs);
        },
 };

 