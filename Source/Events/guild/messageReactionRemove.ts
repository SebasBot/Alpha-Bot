import {MessageReaction, User} from 'discord.js'

export default async function (Discord:any, BOT:any, reaction:MessageReaction, user:User) {
	if(reaction.partial)
    {
        reaction = await reaction.fetch();
    }
	const reactionRemoved = {
		user: user.tag,
		iconURL: user.avatarURL(),
		channelId: reaction.message.channelId,
		emoji: reaction.emoji,
		messageURL: reaction.message.url,
		createdAt: Date.now(),
	};
    await BOT.Reaction.set(reactionRemoved.channelId, reactionRemoved)
   console.log('----------Reaccion Eliminada-----------')
   console.log(reactionRemoved)
   console.log('--------------------------------------')
}