//Calling constants used

const randomPuppy = require('random-puppy');
const Discord = require('discord.js');

module.exports = {
	name: 'meme',
    description: 'Get a random meme',
    cooldown: 30,
    usage: "<Search sub (no r/ needed) [if you don't add one it defaults to r/memes]/refill (If you are getting errors try .meme refill and if that doesn't work message Chase)> ",
	execute(message, args) {
				const prefix = message.prefix;
        //Reloads the command to refill the memes
        if(args[0] == 'refill') {
            const commandName = 'meme';
            const command = message.client.commands.get(commandName)
                || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (!command) {
                return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
            }

            delete require.cache[require.resolve(`./${command.name}.js`)];

            try {
                const newCommand = require(`./${command.name}.js`);
                message.client.commands.set(newCommand.name, newCommand);
                message.channel.send('Refilled Memes');
            } catch (error) {
                console.log(error);
                message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
            }
            console.log('REFILLED MEMES');
        } else if(!args[0]) {
            //Calls subreddit to get the images from
            randomPuppy('memes')
                .then(url => {
                    //Makes and sends a new embed with the info of the image it collected
                    const MemeEmbed = new Discord.MessageEmbed()
                        .setTitle('Fresh memé:')
                        .setImage(url)
                        .setColor('#37d461')
                        .setFooter('If it\'s a video/doesn\'t load, copy the link and paste it into a browser')
                    message.channel.send(MemeEmbed);

            });
        }

    }
}
