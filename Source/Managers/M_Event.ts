import { Client } from "discord.js"
import { readdirSync } from "fs"


export default (BOT:Client, Discord:any) => {
   function dirCharge (dirs:String){
        const EventFiles = readdirSync(`./Compiled/Events/${dirs}`).filter(file=>file.endsWith('js'))
        for(const Doc of EventFiles)
        {
            const EVENT = require(`../Events/${dirs}/${Doc}`);
            const EVENT_NAME = Doc.split('.')[0]
            BOT.on(EVENT_NAME, EVENT.default.bind(null, Discord, BOT))
        }
    }

   const EVENTS = readdirSync(`./Compiled/Events`)
   for( const Directory of EVENTS)
    {
        dirCharge(Directory)
    }
}

