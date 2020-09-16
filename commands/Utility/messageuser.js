module.exports = {
    name: 'messageuser',
	description: 'Send a message to a member',
	cooldown: 5,
	execute(message) {
        const prefix = message.prefix;
        if(message.member.roles.cache.has('750894397113106453')) {
            let dmContent = message.content.replace(`${prefix}messageuser`, "")
            message.mentions.users.first().send(dmContent)
        } else
            message.channel.send("You cannot do that!")

	}
}
