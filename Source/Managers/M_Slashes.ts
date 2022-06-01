import { readdirSync } from "fs";

export default function (BOT:{[key: string]: any}, Discord:any)
{
    const SlashCommands = readdirSync('./Source/SlashCommands')
    for (const Folder of SlashCommands) 
    {
        const File = readdirSync(`./Source/SlashCommands/${Folder}`)
            .filter(file=>file.endsWith('js'))
        for(const Module of File)
        {
            const SlashCommand = require(`../SlashCommands/${Folder}/${Module}`)
            BOT.SlhCommands.set(SlashCommand.default.name, SlashCommand.default)
        }
    }
}