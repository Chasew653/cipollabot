const randomPuppy = require('random-puppy');
const Discord = require('discord.js');



module.exports = {
	name: 'puppy',
    description: 'Get a random puppy image',
    cooldown: 30,
	execute(message, args) {
				const prefix = message.prefix;
        //Finds puppy image
        randomPuppy()
            .then(url => {
                //Uses the image URL to make an embed and send it
                const pictureembed = new Discord.MessageEmbed()
                    .setTitle('Your wish is my command:')
                    .setImage(url)
                    .setColor('#37d461')
                message.channel.send("Grabbing image...", pictureembed);

            });

    }
}
