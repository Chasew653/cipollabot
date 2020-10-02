
const Discord = require('discord.js');

module.exports = {
    name: "uhoh",
    description: "Something wrong? Need staff attention? Use this command.",
    args: false,
    execute(message, args) {
        let modRepChan = message.guild.channels.cache.get('751171817573580971');
        message.channel.send("Alerting the mods...");
        message.channel.send("What's this alert about? (Type STOP to cancel alert)");
        const filter = m => {
            return m.author.id === message.author.id;
        }
        const collector = new Discord.MessageCollector(message.channel, filter, {});
        collector.on('collect', msg => {
            if(msg.content.toUpperCase() === "STOP") {
                message.channel.send("Cancelled alert");
                return collector.stop();
            }
            message.channel.send("Sent alert.");
            modRepChan.send(new Discord.MessageEmbed().setTitle(`Alert from ${msg.member.displayName}`).setAuthor(`${msg.author.username}`, msg.author.displayAvatarURL()).setDescription(`"[${msg.content}](${msg.url} 'Jump to the message')"`).setColor(`GREEN`));
            const onlineMod = message.guild.members.cache.find(mem => mem.presence.status === 'online' && mem.roles.cache.has('751131107855958056'));

            if(!onlineMod) {
                message.channel.send("There are no mods online right now. Report sent either way.")
            } else {
                modRepChan.send(`${onlineMod} ^^^`);
            }
            collector.stop();
        })
    }
}