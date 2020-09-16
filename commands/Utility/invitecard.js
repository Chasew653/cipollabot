const Discord = require('discord.js');

const ranstring = require("randomstring");




module.exports = {
  name: 'invitecard',
  description: "Get a single-use invite card to Onionkraft",
  async execute(message, args, client) {
    const prefix = message.prefix;

    let randomColor = "#" + ranstring.generate({charset: 'hex', length: 6});
    const newInvite = await message.channel.createInvite({maxUses: 1, maxAge: 0})
    let inviteCardEmbedCode = new Discord.MessageEmbed()
      .setTitle("Here is your invite")
      .setDescription("||" + newInvite + "||")
      .setFooter("Single use. All invites are logged, use wisely.")
      .setColor(randomColor)
    let inviteCardEmbedLink = new Discord.MessageEmbed()
      .setTitle("Here is your invite")
      .setDescription("||https://discord.gg/invite/" + newInvite + "||")
      .setFooter("Single use. All invites are logged, use wisely.")
      .setColor(randomColor)

    client.channels.cache.get('751171817573580971').send(message.author + " created an invite \"||" + newInvite + '||"');





  }
}
