module.exports = {
    name: "deport",
    description: "STRAIGHT TO BRAZIL!!!",
    args: true,
    usage: "<deportee>",
    async execute(message, args) {
        let brazil = await message.guild.roles.cache.find(r => r.name === "In Brazil");
        let deportee = message.mentions.members.first();
        switch(message.member.roles.cache.has("750894397113106453")) {
            case true:
                deportee.roles.add(brazil);
                message.channel.send("Deported them to Brazil!");
                break;
            case false:
                message.member.roles.add(brazil);
                message.channel.send("You can't deport people, but you did accidentally deport yourself ): " + `<@${message.author.id}>`
                );
                break;
        }
    }
}