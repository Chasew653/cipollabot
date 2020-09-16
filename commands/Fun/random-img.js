const coolImages = require('cool-images');
const Discord = require('discord.js');
const randstr = require('randomstring');


module.exports = {
  name: "random-img",
  description: "Get a random chemical profile!",
  cooldown: 20,
  execute(message, args) {
    let randColor = "#" + randstr.generate({charset: 'hex', length: 6});
    let imageGen = coolImages.one(600, 800);
    let imEm = new Discord.MessageEmbed().setImage(imageGen).setColor(randColor)
    message.channel.send(imEm);
  }
}
