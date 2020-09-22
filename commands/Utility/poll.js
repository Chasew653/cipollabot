const Discord = require("discord.js");
const serverColor = "#37d461";

module.exports = {
	name: 'poll',
	description: 'Create a poll',
	args: true,
	usage: '[poll content]',
	cooldown: 10,
    async execute(message, args) {
				const prefix = message.prefix;

        let pollContentRaw = message.content.replace(`${prefix}poll`, "");
        let pollContent = pollContentRaw;
        message.delete();
        pollScore = 0;
        pollYesVotes = 0;
        pollNoVotes = 0;
        if(pollScore < 0) {
            embedColorChoice = '#cf3232'
        } else if(pollScore == 0) {
            embedColorChoice = serverColor
        } else if(pollScore > 0) {
            embedColorChoice = '#00e04f'
        }
        pollScoreEmbed = new Discord.MessageEmbed()
            .setTitle("Poll Status")
            .addFields(
                { name: 'Yes Votes: ', value: pollYesVotes },
                { name: 'No Votes: ', value: pollNoVotes },
                { name: 'Poll Score: ', value: pollScore }
            )
            .setColor(embedColorChoice)
            .setFooter("This poll was created by " + message.author.username + ", react with '🛑' to close the poll (Only " + message.author.username + " can, since they're the creator)")
        let pollMessage = await message.channel.send(pollContent, pollScoreEmbed);
        pollMessage.react('751174164303446137');
        pollMessage.react('751174121655894136');
        pollMessage.react('🛑');
        const filter = (reaction, user) => {
            return reaction.emoji.id === "751174164303446137" || reaction.emoji.id === "751174121655894136" || reaction.emoji.name === "🛑";
        };
        const pollCollector = pollMessage.createReactionCollector(filter, { dispose: true });
        pollCollector.on('collect', (reaction, user) => {
            if(user.id !== "734227079976976394") {
                switch(reaction.emoji.name) {
                    case "Check":
                        pollScore = pollScore + 1;
                        pollYesVotes = pollYesVotes + 1;
                        if(pollScore < 0) {
                            embedColorChoice = '#cf3232'
                        } else if(pollScore == 0) {
                            embedColorChoice = serverColor;
                        } else if(pollScore > 0) {
                            embedColorChoice = '#00e04f'
                        }
                        pollScoreEmbed = new Discord.MessageEmbed()
                            .setTitle("Poll Status")
                            .addFields(
                                { name: 'Yes Votes: ', value: pollYesVotes },
                                { name: 'No Votes: ', value: pollNoVotes },
                                { name: 'Poll Score: ', value: pollScore }
                            )
                            .setColor(embedColorChoice)
                            .setFooter("This poll was created by " + message.author.username + ", react with '🛑' to close the poll (Only " + message.author.username + " can, since they're the creator)")

                        pollMessage.edit(pollContent, pollScoreEmbed)
                        console.log('Custom emojis work')
                        break;
                    case "X_":
                        pollScore = pollScore - 1;
                        pollNoVotes = pollNoVotes + 1;
                        if(pollScore < 0) {
                            embedColorChoice = '#cf3232'
                        } else if(pollScore == 0) {
                            embedColorChoice = serverColor
                        } else if(pollScore > 0) {
                            embedColorChoice = '#00e04f'
                        }
                        pollScoreEmbed = new Discord.MessageEmbed()
                            .setTitle("Poll Status")
                            .addFields(
                                { name: 'Yes Votes: ', value: pollYesVotes },
                                { name: 'No Votes: ', value: pollNoVotes },
                                { name: 'Poll Score: ', value: pollScore }
                            )
                            .setColor(embedColorChoice)
                            .setFooter("This poll was created by " + message.author.username + ", react with '🛑' to close the poll (Only " + message.author.username + " can, since they're the creator)")
                        pollMessage.edit(pollContent, pollScoreEmbed)
                        break;
                    case "🛑":
                        if(user.id == message.author.id) {
                            pollYesVotes = pollCollector.collected.get('751174121655894136').users.cache.size
                            pollNoVotes = pollCollector.collected.get("751174164303446137").users.cache.size
                            pollScore = pollYesVotes - pollNoVotes
                            if(embedColorChoice == '#cf3232') {
                                pollResults = "motion failed"
                            } else if(embedColorChoice == serverColor) {
                                pollResults = "motion didn't conclude"
                            } else if(embedColorChoice == '#00e04f') {
                                pollResults = "motion was carried"
                            }
                            pollCollector.stop()

                            pollScoreEmbed = new Discord.MessageEmbed()
                                    .setTitle("Poll Status")
                                    .addFields(
                                        { name: 'Yes Votes: ', value: pollYesVotes - 1 },
                                        { name: 'No Votes: ', value: pollNoVotes - 1 },
                                    )
                                    .setColor(serverColor)
                                    .setFooter("This poll was created by " + message.author.username + '\nAnd the ' + pollResults)
                            pollMessage.edit(pollContent + "\n\n\nClosed the poll succesfully", pollScoreEmbed)
                        } else {
                            user.send("You cannot stop a poll you didn't make!")
                        }
                }
            }

        });
        pollCollector.on('remove', (reaction, user) => {
            switch(reaction.emoji.name) {
                case "Check":
                    pollScore = pollScore - 1;
                    pollYesVotes = pollYesVotes - 1;
                    if(pollScore < 0) {
                        embedColorChoice = '#cf3232'
                    } else if(pollScore == 0) {
                        embedColorChoice = serverColor
                    } else if(pollScore > 0) {
                        embedColorChoice = '#00e04f'
                    }
                    pollScoreEmbed = new Discord.MessageEmbed()
                        .setTitle("Poll Status")
                        .addFields(
                            { name: 'Yes Votes: ', value: pollYesVotes },
                            { name: 'No Votes: ', value: pollNoVotes },
                            { name: 'Poll Score: ', value: pollScore }
                        )
                        .setColor(embedColorChoice)
                        .setFooter("This poll was created by " + message.author.username + ", react with '🛑' to close the poll (Only " + message.author.username + " can, since they're the creator)")

                    pollMessage.edit(pollContent, pollScoreEmbed)
                    break;
                case "X_":
                    pollScore = pollScore + 1;
                    pollNoVotes = pollNoVotes - 1;
                    if(pollScore < 0) {
                        embedColorChoice = '#cf3232'
                    } else if(pollScore == 0) {
                        embedColorChoice = serverColor
                    } else if(pollScore > 0) {
                        embedColorChoice = '#00e04f'
                    }
                    pollScoreEmbed = new Discord.MessageEmbed()
                        .setTitle("Poll Status")
                        .addFields(
                            { name: 'Yes Votes: ', value: pollYesVotes },
                            { name: 'No Votes: ', value: pollNoVotes },
                            { name: 'Poll Score: ', value: pollScore }
                        )
                        .setColor(embedColorChoice)
                    pollMessage.edit(pollContent, pollScoreEmbed)
                    break;
            }
        });




    }
}
