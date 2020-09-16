module.exports = {
  name: "warn",
  description: "Warn a user",
  args: true,
  usage: "<@user> <reason>",
  execute(message, args) {
    const prefix = message.prefix;
    let reason = args.splice(1,args.length).join(" ");
    const mentionedUser = message.mentions.users.first();
    mentionedUser.send("You have been warned for \"" + reason + "\" on the Onionkraft server. Do NOT do that again or you will face consequences");
    message.author.send("Warned " + mentionedUser + " successfully.");
  }
}
