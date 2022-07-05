import { REST } from "@discordjs/rest"
import { readdirSync } from "fs"
import { Routes } from "discord-api-types/v9";

const Commands:String[] = []
const Directory:string = './Compiled/SlashCommands'
const CommandFiles = readdirSync(Directory)

for(const Folder of CommandFiles)
{
    const SlashFile = readdirSync(`${Directory}/${Folder}/`)
        .filter(file => file.endsWith('js'))
    for (const Module of SlashFile)
    {
        const Command = require(`../SlashCommands/${Folder}/${Module}`)   
        Commands.push(Command.default.data)    
    }
}
const Rest = new REST({version: '9'})
    .setToken(process.env.BOT_TOKEN as string);

export default async function () 
{
        await Rest.put(
            Routes.applicationCommands(process.env.CLIENTID as string),
            {body: Commands}
        )
        .then(()=>console.log('Comandos Escritos Exitosamente'))
        .catch(console.error)
    
} 
