module.exports = async (Discord, cliente, interaccion) => {
    if (!interaccion.isCommand()) return;
    const slashName = cliente.Slashcommands.get(interaccion.commandName);
    //console.log(slashName)
    if(!slashName) return
    try{
        await slashName.execute(Discord,cliente, interaccion)
    }
    catch(error){
        console.log(error)
        return interaccion.reply({content: 'Algo salio mal', ephemeral: true})
    }}
