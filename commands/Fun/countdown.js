const Discord = require('discord.js');
var dateTime = require('get-date');

let useThisDateFormate = "MM/DD/YYYY";

function getDateDistance(startDate, endDate) {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays - 7;
}



module.exports = {
  name: "countdown",
  description: "Get a countdown for a holiday",
  args: true,
  usage: "<list/holiday>",
  execute(message, args) {
    const prefix = message.prefix;

    let formattedDateArray = dateTime().split('/');
    let formattedDateString = formattedDateArray[1] + '/' + formattedDateArray[0] + '/' + formattedDateArray[2];


    //sending embed
    let christmasLengthEmbed = new Discord.MessageEmbed()
      .setTitle("There are " + getDateDistance(formattedDateString, '12/31/2020') + " days until Christmas.")
      .setColor('#0da11e')
      .setImage("https://media.discordapp.net/attachments/608162229820325890/748409429250277458/212-2123588_minimalist-christmas-tree-drawing.png?width=722&height=702")
    if(args[0] == "christmas" || 'satanmas') {
      message.channel.send(christmasLengthEmbed);
    } else {
      message.channel.send("BETA");
    }

  }
}
