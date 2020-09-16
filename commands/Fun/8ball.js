const responses = require('../../JSON & Info lib/responses.json');
const ballResponse = require('../../JSON & Info lib/8ballindex.js');


module.exports = {
    name: '8ball',
	  description: 'Ask the 8 Ball a question',
    cooldown: 5,
    args: true,
	async execute(message, args) {
    const prefix = message.prefix;

    const eightBallSays = ballResponse.give8ballResponse();
    message.channel.send(eightBallSays[0]);
    if(eightBallSays[1]) {
      message.channel.send("You collected the easter egg!");

    }

	}
}
