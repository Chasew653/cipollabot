module.exports = {
    name: 'stopbot',
	description: 'Stop the bot with the kill code',
    cooldown: 5,
    usage: "<Kill Code (If you aren't a developer)>",
	execute(message, args) {
        const prefix = message.prefix;
        if(message.member.roles.cache.has('750894397113106453') || args[0] == "killOnionBotNow1253") {
            process.exit();
        } else
            message.reply("That's the wrong kill code!")

	}
}
