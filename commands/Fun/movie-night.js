const Discord = require('discord.js');

module.exports = {
    name: "movie-night",
    description: "Announce a new movie night!",
    args: false,
    async execute(message, args) {
        let movieNightem = new Discord.MessageEmbed()
            .setTitle("Yay! Movie Night tonight! 🍿")
            .setDescription("Tonight we're doing a movie night. At about 9:30pm (ish), show up in the soup bowl to watch a movie!\nPut and vote on movie suggestions in <#754426779996782633>\n\nWho's coming? React to get added:\n")
            .setColor("RED")
            .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/socialmedia/apple/237/popcorn_1f37f.png")
        let emMsg = await message.channel.send(movieNightem);
        await emMsg.react('👍');
        //Filtering.....

        const filter = (reaction, user) => {
            return reaction.emoji.name === '👍' || user.id === message.author.id;
        };
            
        const collector = emMsg.createReactionCollector(filter, {});
            
        collector.on('collect', (reaction, user) => {
            switch(reaction.emoji.name) {
                case '👍':
                    movieNightem.setTitle(movieNightem.title).setDescription(movieNightem.description + `${message.member.nickname}\n`)
                    emMsg.edit(movieNightem);
                    break;
                case '🛑':
                    collector.stop();
                    emMsg.edit(updatedEm.setColor("BLUE"))
                    break;
            }
        });

    }
}