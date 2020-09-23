const fetch = require('node-fetch');
const Discord = require('discord.js');
const hastebin = require('hastebin.js');
const haste = new hastebin({ url: 'https://hasteb.in' });


module.exports = {
    name: "trivia",
    description: "Get a random trivia question",
    args: false,
    cooldown: 5,
    async execute(message, args) {
        if(message.channel.id !== "758186150497353739" && message.channel.id !== "758394060599197827") return message.reply(`Use trivia commands in <#758186150497353739>`)
        let queryUrl = "https://jservice.io/api/random"
        let settings = { method: "Get" }

        message.channel.startTyping();
        fetch(queryUrl, settings).then((res) => res.json()).then((json) => {
            let correctAns = json[0].answer.toLowerCase().replace("<i>", "").replace("</i>", "")

            try {
                let triviaCard = new Discord.MessageEmbed()
                    .setTitle("TRIVIA")
                    .addField("Clue:", json[0].question)
                    .addField("Answer:", `Send it in 10 or less seconds`)
                    .setDescription(`Difficulty: ${json[0].value}\nCategory: ${json[0].category.title}\n**TYPE 'idk' TO SKIP**`)
                    .setColor(`#${Math.floor(Math.random()*16777215).toString(16)}`)
                //
                message.channel.send(triviaCard);
                const filter = m => m.content.toLowerCase() === correctAns || m.content.toLowerCase() === "idk" || m.content.toLowerCase() === "pass";
                const collector = message.channel.createMessageCollector(filter, { time: 15000 });
                
                let correct = false;
                console.log(`${message.author.username}: ${correctAns} in ${message.channel.name}`);
                collector.on('collect', m => {
                    if(m.content.toLowerCase() === "idk") {
                        correct = true;
                        message.channel.send("You skipped!\nThe answer was \"" + correctAns + '"');
                        collector.stop();
                    } else if(m.content.toLowerCase() === "pass") {
                        correct = true;
                        const link = haste.post(`Correct answer for "${json[0].question}":\n"${correctAns}"`, 'html').then(link => {
                            message.channel.send(`Passed Question.\nAnswer for later if you want:\n${link.replace("https://hasteb.in/", "https://hasteb.in/raw/").replace(".html", "")}`);
                        });
                        this.execute(message, args)
                        collector.stop();
                    } else {
                        message.channel.send(`Correct ${m.author}!`);
                        correct = true;
                        collector.stop();
                    }
                });
                
                collector.on('end', collected => {
                    if(correct) return;
                    message.channel.send(`Nobody said the correct answer, which was "${correctAns}"`);
                });
            } catch(error) {
                return message.channel.send("Stop spamming it!");
            }

        })

        message.channel.stopTyping();
    }
}