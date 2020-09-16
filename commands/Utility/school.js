const images = require('../../JSON & Info lib/imagesLinks.json');
const Discord = require('discord.js');


module.exports = {
  name: 'school',
	description: 'Get the latest school info, and resources, all in one place',
  args: true,
  usage: '<info/links> <Schedule type (online/blended)> ',
	execute(message, args) {
    const prefix = message.prefix;
    if(args[0].toUpperCase() == 'INFO') {
      if(args[1].toUpperCase() == 'ONLINE') {
        message.channel.send(new Discord.MessageEmbed().setTitle('Here is the schedule for online learning!').setImage(images.schoolSched_blended1).setColor('#4444fd'));
      }
      if(args[1].toUpperCase() == 'LINKS') {}
    }
  }
}
