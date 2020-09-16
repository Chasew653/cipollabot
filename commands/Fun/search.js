//BETA
//BETA
const randomPuppy = require('random-puppy');
const Discord = require('discord.js');
const serp = require("serp");
const wiki = require('wikijs');

async function wikiEmbed(message, args) {
    const summary = await wiki.find('luke skywalker').then(page => page.summary());
    //const mainImage = await wiki().page(args[1]).then(page => page.mainImage()).catch(err => console.log(err));
    //const pageLink = await wiki().page(args[1]).then(page => page.url()).catch(err => console.log(err));

    const summaryEmbed = new Discord.MessageEmbed()
        .setTitle('Wiki info found for "' + args[1] + "'")
        .setDescription(summary)
        .setImage('https://cdn.discordapp.com/attachments/608162229820325890/736395765416722523/wikilogo.png')
        .setFooter('Found by BrotBot at ')
        .setColor('#FFFFFF')
        .setThumbnail('https://cdn.discordapp.com/attachments/608162229820325890/736395765416722523/wikilogo.png')
        .setAuthor('FEATURE STILL IN BETA')
};



module.exports = {
    name: 'search',
    description: 'Search reddit or wikipedia',
    args: true,
    usage: "<Place to search [wiki/reddit]> <Thing to search (Reddit seaches only turn up images)>",
    execute(message, args) {
        const prefix = message.prefix;
        if(args[0] == 'reddit') {
            randomPuppy(args[1])
                .then(url => {
                    console.log(url);
                    const PictureEmbed = new Discord.MessageEmbed()
                        .setTitle('Found this picture on Reddit from your search "' + args[1] + '":')
                        .setImage(url)
                        .setColor('#37d461')
                        .setFooter('If it\'s a video/doesn\'t load, copy the link and paste it into a browser')
                    message.channel.send(PictureEmbed);
                });
        } else if(args[0] == 'wiki') {
            wikiEmbed(message, args);
        }
    }

}
