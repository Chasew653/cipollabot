const querystring = require('querystring');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const hastebin = require('hastebin.js');

module.exports = {
    name: "urban",
    description: "Look up something on the urban dictionary",
    args: true,
    usage: "<query>",
    async execute(message, args) {
        message.channel.startTyping();
        const query = querystring.stringify({ term: args.join(' ') });
        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
        if (!list) {
            return message.channel.send(`No results found for **${args.join(' ')}**.`);
        }

        const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
        const [answer] = list;
        if(!answer) return message.channel.send("No results found!")

        const embed = new Discord.MessageEmbed()
            .setColor(`#${Math.floor(Math.random()*16777215).toString(16)}`)
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields(
                { name: 'Definition', value: trim(answer.definition, 1024) },
                { name: 'Example', value: trim(answer.example, 1024) },
                { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` }
            )
            .setThumbnail(`https://lh3.googleusercontent.com/unQjigibyJQvru9rcCOX7UCqyByuf5-h_tLpA-9fYH93uqrRAnZ0J2IummiejMMhi5Ch`)
        //lol
        let resultString = `Word: ${answer.word}\nUrl: ${answer.permalink}\nDefinition: ${answer.definition}\nExample: ${answer.example}`
        const haste = new hastebin({ url: 'https://hasteb.in' });

        const link = haste.post(resultString, 'html').then(link => {
            message.channel.send(link, embed);
        });
        message.channel.stopTyping();
    }

}