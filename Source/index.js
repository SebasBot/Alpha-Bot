const fs = require('fs')
const { Collection ,Client, Intents, MessageEmbed} = require('discord.js')
const dotenv = require ('dotenv'); dotenv.config()

const client = new Client({intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]})
client.Slashcommands = new Collection()

const ComandosSlash = fs.readdirSync('./ComandosSlash')
    for(const carpetaSlash of ComandosSlash){
        const ArchivoSlash = fs.readdirSync(`./ComandosSlash/${carpetaSlash}`).filter(file => file.endsWith('.js'))
        for (const Doc of ArchivoSlash){
            const Slashcommand = require(`./ComandosSlash/${carpetaSlash}/${Doc}`)
            client.Slashcommands.set(Slashcommand.data.name, Slashcommand)
        }
    }

   // console.log(client.Slashcommands)

client.once('ready', () => {
    console.log('Alpha Bot v1.1 esta listo')

})



client.on('messageCreate', message =>{
    //console.log(message)
    if(message.content=='<@!854753076664729600>'){
        message.reply('Mi nombre es Alpha-Bot, estoy aqui para servirte')
    }
    
    if(message.content=='embed'){
        
    }

})

client.on('interactionCreate',async interaccion=>{
    if (!interaccion.isCommand()) return;
    const slashName = client.Slashcommands.get(interaccion.commandName);
    //console.log(slashName)
    if(!slashName) return
    try{
        await slashName.execute(interaccion)
    }
    catch(error){
        console.log(error)
        return interaccion.reply({content: 'Algo salio mal', ephemeral: true})
    }
    //console.log(interaccion.isSelectMenu())
    //console.log(interaccion)    
})   

client.login(process.env.TOKEN)

//todos los procesos dotenv se pueden modificar de acuerdo a tu medida

