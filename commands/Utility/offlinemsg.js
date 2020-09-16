//Calls constants used
const embed1 = require('../../embeds/offlineembed.json');
const client = require('../../index.js');
//Defining the function
async function offlinemessage(message, args) {
    //Makes sure to send in proper channel
    var brotchannelchecker = message.guild.channels.cache.get("750889221274861680")
    let thumbsupmessage = await brotchannelchecker.send(args[0], embed1);
    thumbsupmessage.react('👍');
    //Approved message emoji:
    thumbsupmessage.react('751174164303446137');
};

module.exports = {
	name: 'offlinemsg',
    description: 'Send an offline embed & DM to offline user',
    args: true,
    usage: "<user>",
    cooldown: 20,
	execute(message, args) {
        const prefix = message.prefix;
        //Makes sure they have the proper role, and if they do, sends the embed
        if (message.member.roles.cache.has("750894397113106453")) {
            var pinguserdm = message.mentions.users.first();
            var pinguser = args[0];
            message.delete();
            var logofflinewarn = message.guild.channels.cache.get("751171817573580971")
            logofflinewarn.send("Warned " + args[0] + " for being inactive at " + message.createdAt);

            offlinemessage(message, args);
            try {
                pinguserdm.send(embed1);
            } catch(error) {
                message.channel.send("This user has their DM's closed");
                console.log(error);
            }
        } else {
            //Error if they don't have the perms
            message.channel.send("You don't have permissions to do that!")
        };

    }
};
