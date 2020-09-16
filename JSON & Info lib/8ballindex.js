const Discord = require('discord.js');

const responsesGeneral = [
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes — definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'Don’t count on it.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.',
    "No.",
    "My sources tell me yes!",
    "My sources tell me no!",
    "I don't know everything you know.",
    "I don't really feel like answering.",
    "Definitely.",
    "Definitely not.",
    "Nope.",
    "Yep.",
    "Yuh.",
    "Absolutely not!",
    "I am once again asking you to not give me stupid questions",
    "You should ask Albert Einstein even I don't know the answer.",
    "This is for rachel you nasty ass hoe: shut up",
    "Mi pans, su su su, su su su.\nMi pans, yakakus, nyam nyam nyam"
];







function give8ballResponse() {
    if(Math.floor(Math.random() * 10 === 69)) {
      let easterEgg8ballEmbed = new Discord.MessageEmbed().setTitle("Oh boy, an easter egg!").setDescription(responsesGeneral[34]).setColor('#ebcf00').setImage('https://media.discordapp.net/attachments/735209236463747212/750460453376753814/2Q.png');
      let receivedEasterEgg = true;
      let returnArray = [easterEgg8ballEmbed, receivedEasterEgg];
      return returnArray;
    } else {
      let returnMessage = responsesGeneral[Math.floor(Math.random() * responsesGeneral.length)];
      let receivedEasterEgg = false;
      let returnArray = [returnMessage, receivedEasterEgg];
      return returnArray;
    }
}

module.exports = { give8ballResponse };
