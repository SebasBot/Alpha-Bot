const fs = require('fs') //mas tarde hacer un map mas elaborado
const {SlashCommandBuilder} = require('@discordjs/builders')
const { MessageActionRow, MessageSelectMenu, Options, SelectMenuInteraction } = require('discord.js')
const { Categoria, Seccion, Menu } = require('./help.json')

module.exports = {
   name: "help",
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Otorga una lista de comandos disponibles'),  
    async execute(interaccion){
            const lista = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId('Noselec')
                .setPlaceholder('Seleccione una Categoria')
                .addOptions([Menu.Var1,Menu.Var2,Menu.Var3,Menu.Var4]),
            );
            await interaccion.reply({ embeds: [Categoria] , components: [lista] , ephemeral: true})
            .then(()=>{
               console.log('Tarea hecha con Exito, esperando proximas ordenes')
            })
            .catch(console.error)

 const filter = i => i.customId === 'Noselec'&& i.user.id === interaccion.member.user.id;
 const Collector = interaccion.channel.createMessageComponentCollector({
    filter, componentType: "SELECT_MENU", time: 10000 })
             
 Collector.on('collect', async i =>{
    if(!i.customId==='Noselec')return
    try{ 
    await i.deferUpdate();
     switch(i.values[0]){
        case 'first': 
        await i.editReply({embeds:[Seccion.Seccion1], components: []});Collector.stop();break
        case 'second': 
        await i.editReply({embeds:[Seccion.Seccion2], components: []});Collector.stop();break
        case 'third': 
        await i.editReply({embeds:[Seccion.Seccion3], components: []});Collector.stop();break
        case 'fourth': 
        await i.editReply({embeds:[Seccion.Seccion4], components: []});Collector.stop();break
     }}
     catch(error){
         console.log(error); 
         interaccion.channel.send({content: 'Ocurrio un error', 
         })}

 })
 Collector.on('end', collected => {
 console.log(`${collected.size} eleccion hecha, tarea completada`);}
 )
 }

}
 