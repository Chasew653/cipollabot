const Discord = require('discord.js');
const mongoose = require('mongoose');
const gM = require('../../models/guildsModel.js');

module.exports = {
  name: "guild-data",
  description: "Set or get guild data",
  args: true,
  usage: "<get/set> [dataType] [newData]",
  async execute(message, args) {
    let notFoundEm = new Discord.MessageEmbed().setTitle("Oh no!").setDescription("It seems that this server doesn't have that attribute, the valid guild data is:").addField("name", "The name of the guild").addField("id", "The guild ID (Cannot be changed)").addField("prefix", "The current set prefix").addField("donations", "See the donators (Cannot be changed)")
    let guildDoc = await gM.findOne({id: message.guild.id}).exec().then(res => res);
    if(args[0] === "get") {
      if(guildDoc[args[1]]) {
        message.channel.send(`I found this in the guild data: ${guildDoc[args[1]]}`);
      } else {
        message.channel.send(notFoundEm);
      }
    } else if(args[0] === "set" && message.member.roles.cache.has('750894397113106453') && guildDoc[args[1]]) {
      let dataT = args[1];
      let dataS = args[2];
      if(dataT !== "id" && dataT !== "donations") {
        guildDoc[dataT] = dataS;
        await guildDoc.save();
        message.channel.send(`Changed the preferred ${dataT} to ${dataS}`);
      }
    } else if(!message.member.roles.cache.has('750894397113106453')) {
      message.channel.send("Sorry, only Onioneers can change guild data!")
    } else {
      message.channel.send(notFoundEm);
    }
  }
}
