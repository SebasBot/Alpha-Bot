const fs = require('fs')
const {REST} = require('@discordjs/rest')
const {Routes} = require('discord-api-types/v9')
const dotenv = require('dotenv'); dotenv.config()

const slashcommands = []
const slashFiles = fs.readdirSync('./ComandosSlash')

for(const carpetaSlash of slashFiles){
    const ArchivoSlash = fs.readdirSync(`./ComandosSlash/${carpetaSlash}/`).filter(file => file.endsWith('.js'))
    for(const Doc of ArchivoSlash){
        const Slash = require(`./ComandosSlash/${carpetaSlash}/${Doc}`)
        slashcommands.push(Slash.data.toJSON())
    }
}
const Rest = new REST({version: '9'}).setToken(process.env.TOKEN);

(async() => {
    try{
        await Rest.put(
            //Routes.applicationGuildCommands(process.env.CLIENTID,process.env.GUILDID),
            Routes.applicationCommands(process.env.CLIENTID),
            {body: slashcommands});
            console.log('Comandos creados Exitosamente');
        
    }catch(error){
        console.log(error)
    }
})();
