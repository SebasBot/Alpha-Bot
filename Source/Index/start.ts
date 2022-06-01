import 
    Discord,
{
    
    Collection,
    Client,
    Intents
}
from "discord.js"
import 
{
    readdirSync
}
from "fs"

(async () =>
    {

        var BOT: {[key: string]: any} = new Client(
            {
                intents: 
                [
                    Intents.FLAGS.DIRECT_MESSAGES,
                    Intents.FLAGS.GUILD_MESSAGES,
                    Intents.FLAGS.GUILDS
                ]
            }
        )
        
        BOT.SlhCommands = new Collection()
        BOT.Events = new Collection()

        const Managers = readdirSync('./Source/Managers/').filter(file => file.endsWith('.js'))
            for(const files of Managers)
            {   
                try
                {
                    require(`./Managers/${files}`).default(BOT, Discord)
                }
                catch(e)
                {
                    console.log(e)
                }

            }
        

        
        await BOT.login(process.env.TOKEN)
    }
)()
