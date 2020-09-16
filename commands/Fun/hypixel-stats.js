const hypixellib = require('node-hypixel');
const imageBank = require('../../JSON & Info lib/imagesLinks.json')
const hypixel = new hypixellib("bd482b76-65aa-4ec8-b0de-c846fd3d9d46");
const Discord = require('discord.js');
const mojangjs = require('mojangjs');



async function getStats(player, statCategory, message) {
  let statsObject = await hypixel.getPlayerByUsername(player);
  return statsObject.stats[statCategory];

}


module.exports = {
	name: 'hypixel-stats',
	description: 'Find the hypixel stats on a player',
	async execute(message, args) {
      const prefix = message.prefix;
      let statsCollector = await getStats(args[0], "Bedwars")
      bedwarsEmbed = new Discord.MessageEmbed()
        .setTitle("Bedwars stats for " + args[0])
        .setColor('#ffd52b')
        .setThumbnail(imageBank.hypixel_h_logo_url)
        .addFields(
          {name: "Games Played: ", value: statsCollector.games_played_bedwars_1},
          {name: "Final Deaths: ", value: statsCollector.final_deaths_bedwars},
          {name: "Final Kills: ", value: statsCollector.final_kills_bedwars},
          {name: "Deaths: ", value: statsCollector.deaths_bedwars},
          {name: "Kills: ", value: statsCollector.kills_bedwars},
          {name: "Wins: ", value: statsCollector.wins_bedwars}

        )

        message.channel.send(bedwarsEmbed);
    }


}
