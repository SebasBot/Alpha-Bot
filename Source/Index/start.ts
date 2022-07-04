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
                    Intents.FLAGS.GUILDS,
                    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
                ],
                partials: ['MESSAGE','REACTION','USER']
            }
        )
        
        //Colecciones
        BOT.SlhCommands     = new Collection()
        BOT.Events          = new Collection()
        BOT.Edits           = new Collection()
        BOT.Deletes         = new Collection()
        BOT.Reaction        = new Collection()
        BOT.Logs            = new Collection()

        require('./slashes.js').default()
        //Escribe todos los comandos 
        
        const Managers = readdirSync('./Source/Managers').filter(file => file.endsWith('.js'))
            for(const files of Managers)
            {   
                try
                {
                    require(`../Managers/${files}`).default(BOT, Discord)
                }
                catch(e)
                {
                    console.log(e)
                }

            }
        

        
        await BOT.login(process.env.BOT_TOKEN)
    }
)();
