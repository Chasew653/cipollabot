const Discord = require('discord.js');

module.exports = {
  execute(message, args, client) {
    let reportEmbed = new Discord.MessageEmbed().setTitle("INCOMING REPORT").setFooter(`From: ${message.author.username}  ` + `(${message.author.id})`, message.author.avatarURL()).setDescription(`||${message.content}||`)
    if(message.content.includes("daniel")) {
      client.channels.cache.get('751171817573580971').send(reportEmbed.setColor("BLUE"));
    } else {
      client.channels.cache.get('751171817573580971').send(reportEmbed.setColor("RED"));
    };

    message.channel.send("Your report has come through, " + `${message.author}`);
  }
}
