module.exports = (Discord, cliente) =>{
    console.log('Alpha-Bot 1.2.7 El progreso es la via')
    console.log('Registrando mensajes: Listo')
    console.log('Ejecutando tareas: Listo')
    console.log('Reuniendo datos: Listo')
    
    let stringPhrases = [
        'mis poderes',
        `${cliente.guilds.cache.size} Servidores`,
        'comandos (/)',
        `${cliente.users.cache.size} Usuarios`,
        ' a @SebasBot#4584',
        'tus posibilidades de ser amado'
    ]
    function random(array){
        return array[Math.floor(Math.random() * array.length)]
    }
    console.log(random(stringPhrases))
    setInterval(()=>{
        cliente.user.setActivity(random(stringPhrases), {type: "WATCHING"} );
    }, 6*1000)
    
}