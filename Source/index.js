//Imports
const { Client, Intents, MessageEmbed } = require('discord.js')
const dotenv = require ('dotenv')
dotenv.config() //las configuraciones del bot

const client = new Client({
    //que es un intent?
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.once('ready', () => {
    //tamos ready?
    console.log('Alpha Bot v 1.1 esta listo')
})

client.on('messageCreate',(message)=>{
    console.log(message.content)
    if(message.content==='hola'){
        message.reply('Hola!')
    }
})

client.on('interactionCreate',(Interaccion)=>{
    console.log(Interaccion)
})
client.login(process.env.TOKEN)