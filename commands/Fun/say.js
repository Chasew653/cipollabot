var profanities = require('profanities');

module.exports = {
	name: 'say',
	description: 'Have the bot say something',
	async execute(message, args) {
		const prefix = message.prefix;		
		const saycontent = args.slice(0).join(" ");
		//Making sure it doesn't ping anybody
		if (saycontent.includes("@everyone")) {
			message.channel.send("You can't do that!")
			message.delete();
		} else {
			//Sends content
        	message.channel.send(saycontent);
			message.delete();
		}



	}
};
