module.exports = {
  name: "check-msg",
  description: "See a members last message",
  args: true,
  usage: "<@thePerson>",
  execute(message, args) {
    try {
      message.channel.send(`${message.mentions.members.first()}'s last message was:\n'${message.mentions.members.first().lastMessage.content}'`);
    } catch(error) {
      message.channel.send("They didn't send their last message in a server!");
      console.log(error);

    }
  }
}
