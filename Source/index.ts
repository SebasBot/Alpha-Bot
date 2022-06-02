const fs = require('fs')
const { 
    Discord, 
    Collection,
    Client, 
    Intents, 
    MessageEmbed 
} = require('discord.js')
const dotenv = require('dotenv'); 
dotenv.config()

const cliente = new Client({
    intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ]
})

cliente.Slashcommands = new Collection();
cliente.Events = new Collection();
cliente.Snipes = new Collection();
cliente.EditSnipes = new Collection();

['M_evento','M_slashes'].forEach(Monitor=>{
    require(`./Monitores/${Monitor}`)(cliente, Discord)
})

cliente.login(process.env.TOKEN)