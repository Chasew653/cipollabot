const fetch = require('node-fetch');
const Discord = require('discord.js');
const hastebin = require('hastebin.js');
const haste = new hastebin({ url: 'https://hasteb.in' });
const triviaSM = require('../../models/triviaScore.js');

class TrophyFinder {
    constructor(scoreAmount) {
        this.gS = scoreAmount;
    }
    getTrophy() {
        let trophyKeeper = {
            "100": "your 100 point trophy, nice job! <:triviaTrophy:758427950550482994>",
            "200": "your 200 point trophy, nice job! <:triviaTrophy:758427950550482994>",
            "500": "your 500 point trophy, nice job! <:triviaTrophy:758427950550482994>",
            "700": "your 700 point trophy, nice job! <:triviaTrophy:758427950550482994>",
            "1000": "your 1000 point trophy, nice job! <:triviaTrophy:758427950550482994>",
            "2000": "your 2000 point trophy, nice job! <:triviaTrophy:758427950550482994>",
            "5000": "your 5000 point trophy, nice job! <:triviaTrophy:758427950550482994>",
            "7000": "your 7000 point trophy, nice job! <:triviaTrophy:758427950550482994>",
            "10000": "your 10000 point trophy, nice job! <:triviaTrophy:758427950550482994>",
            "20000": "your 20000 point trophy, nice job! <:triviaTrophy:758427950550482994>",
            "50000": "your 50000 point trophy, nice job! <:triviaTrophy:758427950550482994>",
            "70000": "your 70000 point trophy, nice job! <:triviaTrophy:758427950550482994>",
            "100000": "your 100000 point trophy, nice job! <:triviaTrophy:758427950550482994>",
            "1000000": "your Trivia Master trophy! <:triviaTrophy:758427950550482994>",
            "1000100": "your Trivia Master trophy! <:triviaTrophy:758427950550482994>",
            "1000200": "your Trivia Master trophy! <:triviaTrophy:758427950550482994>",
            "1000300": "your Trivia Master trophy! <:triviaTrophy:758427950550482994>",
            "1000400": "your Trivia Master trophy! <:triviaTrophy:758427950550482994>",
            "1000500": "your Trivia Master trophy! <:triviaTrophy:758427950550482994>",
            "1000600": "your Trivia Master trophy! <:triviaTrophy:758427950550482994>",
            "1000700": "your Trivia Master trophy! <:triviaTrophy:758427950550482994>",
            "1000800": "your Trivia Master trophy! <:triviaTrophy:758427950550482994>",
            "1000900": "your Trivia Master trophy! <:triviaTrophy:758427950550482994>",
        }
        if(trophyKeeper[this.gs]) {
            return [true, `You earned ${trophyKeeper[this.gs]}`];
        } else {
            return [false];
        }
    }
}

async function addScore(userId, toAdd, userName) {
    const userModel = await triviaSM.findOne({id: userId}).exec();
    if(!userModel) {
        const newUserModel = new triviaSM({id: userId, score: 0, correctAns: 0, username: userName, saved: {}})
        await newUserModel.save();
        const theUserModel = await triviaSM.findOne({id: userId}).exec();

        theUserModel.score = theUserModel.score + toAdd;
        await theUserModel.save();
    } else {
        userModel.score = userModel.score + toAdd;
        await userModel.save();
    }
}

async function subScore(userId, toSub, userName) {
    const userModel = await triviaSM.findOne({id: userId}).exec();
    if(!userModel) {
        const newUserModel = new triviaSM({id: userId, score: 0, correctAns: 0, username: userName, saved: {}})
        await newUserModel.save();
        const theUserModel = await triviaSM.findOne({id: userId}).exec();

        theUserModel.score = theUserModel.score - toSub;
        await theUserModel.save();
    } else {
        userModel.score = userModel.score - toSub;
        await userModel.save();
    }
}

async function correctAnswerGet(userId, userName, m) {
    const userModel = await triviaSM.findOne({id: userId}).exec();
    if(!userModel) {
        const newUserModel = new triviaSM({id: userId, score: 0, correctAns: 0, username: userName, saved: {}});
        await newUserModel.save();

        const theUserModel = await triviaSM.findOne({id: userId}).exec();

        theUserModel.correctAns = theUserModel.correctAns + 1;
        await theUserModel.save();
    } else if(userModel) {
        userModel.correctAns = userModel.correctAns + 1;
        const trophyObj = new TrophyFinder(userModel.score.toString());
        if(trophyObj.getTrophy()[0]) {
            message.channel.send(trophyObj.getTrophy()[1])
        } 
        await userModel.save();
    }


}

async function realCorrectAns(userId, score, userName, m) {
    const userModel = await triviaSM.findOne({id: userId}).exec();
    if(!userModel) {
        const newUserModel = new triviaSM({id: userId, score: 0, correctAns: 0, username: userName, saved: {}});
        
        newUserModel.score = score;
        newUserModel.correctAns = 1;
        await newUserModel.save();
    } else {
        userModel.correctAns++;
        userModel.score = userModel.score + score;
        await userModel.save();
    }
    const finalUserModel1 = await triviaSM.findOne({id: userId}).exec();
    
}

module.exports = {
    name: "trivia",
    description: "Get a random trivia question",
    usage: "[myPoints]",
    cooldown: 5,
    async execute(message, args) {
        if(args[0] === "myPoints") {
            triviaSM.findOne({id: message.author.id}).then(res => {
                if(!res) {
                    message.channel.send(`You need to answer questions to earn points!`)
                } else {
                    message.channel.send(`You have ${res.score} total points.`)
                }
            })
            return;
        } else if(args[0] === 'gamemaster' && message.author.id === "554404024422760458") {
            switch(args[1]) {
                case 'add':
                    addScore(message.mentions.users.first().id, args[3], message.mentions.users.first().username);
                    message.channel.send(`Added ${args[3]} points to their score`);
                    break;
                case 'sub':
                    subScore(message.mentions.users.first().id, args[3], message.mentions.users.first().username);
                    message.channel.send(`Subtracted ${args[3]} points from their score`);
                    break;
                case 'correct':
                    correctAnswerGet(message.mentions.users.first().id, message.mentions.users.first().username);
                    message.channel.send(`Added a correct answer to their score`);
                    break;
            }
            return;
        }
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
                    .setDescription(`Score: ${json[0].value || "free"}\nCategory: ${json[0].category.title}\n**TYPE 'idk' TO SKIP**`)
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
                        if(!json[0].value) {
                            message.channel.send("That was a free question - no points.")
                        } else {
                            realCorrectAns(m.author.id, json[0].value, m.author.username, m);
                            triviaSM.findOne({id: m.author.id}).then(res => {
                                message.channel.send(`Added ${json[0].value} points to your score of ${res.score} points, and added one correct answer to your correct answer count of ${res.correctAns}`)
                            })
                        }
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