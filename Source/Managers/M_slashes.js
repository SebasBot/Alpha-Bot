const fs = require('fs')

module.exports = (cliente, Discord) =>{
    const ComandosSlash = fs.readdirSync('./ComandosSlash/')
    for(const carpetaSlash of ComandosSlash){
        const ArchivoSlash = fs.readdirSync(`./ComandosSlash/${carpetaSlash}/`).filter(file => file.endsWith('.js'))
        for (const Doc of ArchivoSlash){
            const Slashcommand = require(`../ComandosSlash/${carpetaSlash}/${Doc}`)
            cliente.Slashcommands.set(Slashcommand.name, Slashcommand)
        }
    }
}