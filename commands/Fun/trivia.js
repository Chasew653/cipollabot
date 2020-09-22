const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: "trivia",
    description: "Get a random trivia question",
    args: false,
    execute(message, args) {
        let queryUrl = "https://jservice.io/api/random"
        let settings = { method: "Get" }

        message.channel.startTyping();
        fetch(queryUrl, settings).then((res) => res.json()).then((json) => {
            let triviaCard = new Discord.MessageEmbed()
                .setTitle("TRIVIA")
                .addField("Clue:", json[0].question)
                .addField("Answer:", `||${json[0].answer.replace("<i>", "").replace("</i>", "")}||`)
                .setDescription(`Difficulty: ${json[0].value}\nCategory: ${json[0].category.title}`)
                .setColor(`#${Math.floor(Math.random()*16777215).toString(16)}`)
            message.channel.send(triviaCard);
            message.channel.stopTyping();
        })

    }
}