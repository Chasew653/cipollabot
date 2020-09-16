module.exports = {
    name: "soft-kick",
    description: "Kick somebody and then immediately send them an invite via dms",
    args: true,
    usage: "<@theUser> [reason]",
    async execute(message, args, client) {
        if(message.member.roles.cache.has("750894397113106453")) {
            let toKick = message.mentions.members.first();
            args[4] ? toKick.kick({reason: "Soft kick: " + args.slice(4).join(' ')}) : toKick.kick({reason: "Soft kick, check dms"});
            try {
                message.mentions.users.first().send(`You've been soft-kicked by ${message.author.username}\nHere's your new invite: https://discord.gg/UFT9MEH`);
            }
            catch(err) {
                let newInv = await message.channel.createInvite({maxUses: 10, maxAge: 0});
                message.channel.send(`This user was kicked, but they don't have theire dm's open, so please send them this invite: ${newInv}`);
            };
            message.channel.send("Done!");
        } else {
            message.channel.send("You do not have permissions to do that!");
        }


    }
}