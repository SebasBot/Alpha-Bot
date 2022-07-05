import { Client } from "discord.js";

export default function (Discord:any, BOT:Client){
    let Phrases= [
        'mis poderes',
        `${BOT.guilds.cache.size} Servidores`,
        'comandos (/)',
        `${BOT.users.cache.size} Usuarios`,
        'a SebasBot#4584',
        'tus posibilidades de ser amado'
    ]
    
    console.log(`Servidores: ${BOT.guilds.cache.size}`)
    BOT.guilds.cache.forEach(value=>console.log('-',value.name));
    console.log(`Usuarios: ${BOT.users.cache.size}`)
    BOT.users.cache.forEach(value=>console.log('-',value.tag));

    console.log('¡Alpha-Bot 1.2.8 LISTO!')

    function random(array:string[]){
        let Selection:string = array[Math.floor(Math.random() * array.length)]
        return Selection
    }   
    setInterval(()=>{
        BOT.user?.setActivity(random(Phrases), {type: "WATCHING"} );
    }, 6*1000)
    
}