module.exports = {
    name: 'my-avatar',
	description: 'Get your avatar, in case you need to go undercover',
    cooldown: 5,
	async execute(message, args) {
        const prefix = message.prefix;
        let avatarUsageURL = message.author.avatarURL()
        message.channel.send(avatarUsageURL);
	}
}
