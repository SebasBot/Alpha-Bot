const fs = require('fs')

module.exports = (cliente, Discord)=>{
    const dir_charge = (dirs) =>{
        const Archivos_eventos = fs.readdirSync(`./Eventos/${dirs}/`).filter(file => file.endsWith('.js'));
        for(const doc_evento of Archivos_eventos){
            const evento = require(`../Eventos/${dirs}/${doc_evento}`);
            const Nombre_evento = doc_evento.split('.')[0];
            cliente.on(Nombre_evento, evento.bind(null, Discord, cliente))

        }
    }
    ['client','guild'].forEach(e=> dir_charge(e))
}
