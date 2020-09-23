const fetch = require('node-fetch');
const Discord = require('discord.js');
let periodRegex = /^./

module.exports = {
    name: "trumpquote",
    description: "Get a random trump quote",
    args: false,
    execute(message, args) {
        let queryLink = `https://api.tronalddump.io/random/quote`
        let settings = { method:'Get' }
        fetch(queryLink).then((res) => res.json()).then((json) => {
            let tweetEmbed = new Discord.MessageEmbed()
                .setTitle("Donald Trump:")
                .setURL(json._embedded.source[0].url)
                .setDescription(json.value)
                .setTimestamp(json.appeared_at)
                .setThumbnail(`https://1000logos.net/wp-content/uploads/2017/06/Twitter-Logo.png`)
                .setColor(`#${Math.floor(Math.random()*16777215).toString(16)}`)
            message.channel.send(tweetEmbed);
        })
    }
}