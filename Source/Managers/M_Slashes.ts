import { readdirSync } from "fs";

export default function (BOT:{[key: string]: any}, Discord:any)
{   
    const route = './Compiled/SlashCommands'
    const SlashCommands = readdirSync(route)
    for (const Folder of SlashCommands) 
    {
        const File = readdirSync(`${route}/${Folder}`)
            .filter(file=>file.endsWith('js'))
        for(const Module of File)
        {
            const SlashCommand = require(`../SlashCommands/${Folder}/${Module}`)
            BOT.SlhCommands.set(SlashCommand.default.name, SlashCommand.default)
        }
    }
}