module.exports = {
	name: 'purge',
	description: 'Purge a specified amount of messages less than 100',
	execute(message, args) {
		const prefix = message.prefix;
		//Finds amount to purge
		const amount = parseInt(args[0]);
		//If it's not a valid number to use
		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 2 and 99.');
		}
		//Does it if it is a valid number
		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to purge messages in this channel!');
        });
        //Sends response
        message.channel.send("Purged " + String(amount) + " messages.");
	},
};
