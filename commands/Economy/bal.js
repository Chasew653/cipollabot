const playerM = require('../../models/playerModel');
module.exports = {
    name: "bal",
    description: "Check the balance of you or somebody else",
    usage: "bal [@user]",
    async execute(message, args) {
        let toGet = message.mentions.members.first() || message.member;
        let playerDoc = await playerM.findOne({id: toGet.id}).exec();
        if(!playerDoc) return message.channel.send("They don't have a balance ¯\\_(ツ)_/¯");
        if(toGet !== message.member) return message.channel.send(`Player \`${toGet.nickname}\` has a balance of ${playerDoc.bal} coins.`);
        if(toGet === message.member) return message.channel.send(`You have a balance of ${playerDoc.bal} coins.`);
    }
}