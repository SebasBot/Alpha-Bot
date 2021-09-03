//Imports
const fs = require('fs')
const { Collection ,Client, Intents, MessageEmbed } = require('discord.js')
const dotenv = require ('dotenv')
dotenv.config() //las configuraciones del bot
const Prefix = process.env.PREFIX


const client = new Client({intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]})
client.commands = new Collection()
client.cooldowns = new Collection()

const commandFolders = fs.readdirSync('./commands')
    for(const folder of commandFolders){
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'))
        for (const file of commandFiles){
            const command=require(`./commands/${folder}/${file}`)
            client.commands.set(command.name, command)
        }
    }

   
client.once('ready', () => {
    //Esta Listo?
    console.log('Alpha Bot v1.1 esta listo')
})


client.on('messageCreate',(message)=>{
    console.log(message.content)
    if(!message.author.bot){
        if(message.content.includes(Prefix)){

            const args = message.content.slice(Prefix.length).trim().split(' ')
            const commandName = args.shift().toLowerCase()
            const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
   // --comandos de guild exclusivo--       
   if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply('No puedo ejecutar ese tipo de comando en tus mensajes privados!');
     }

    // --comandos con permiso exclusivo--
    if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return message.reply('¿Eh? ¡No puedes hacer eso!');
    }
    }  
    //si no tiene argumentos
    if (command.args && !args.length) {
    let reply = `No has dado argumentos necesarios, ${message.author}!`;
    if (command.usage) { //si posee un modo de uso optimo
      reply += `\nEl uso optimo seria: \`${Prefix}${command.name} ${command.usage}\``;}
    return message.channel.send(reply);
    }

    //--enfriamiento--
    const { cooldowns } = client;
    if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`Espere ${timeLeft.toFixed(1)} segundo(s) antes de re-utilizar \`${command.name}\`.`);
    }
    }
    //aplica el enfriamient
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try { //ejecucion de comando
    command.execute(message, args);
    } catch (error) {
    console.error(error);
    message.reply('Ha ocurrido un error');
    }
    }
    }
})

/*
client.on('interactionCreate',async Interaccion=>{
    console.log(Interaccion)

})    para mas tarde
*/


client.login(process.env.TOKEN)

