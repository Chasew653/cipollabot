const ping = require('minecraft-server-util');

module.exports = {
  name: 'server-status',
	description: 'Get the status of a minecraft server, defaults to Brotkraft',
	execute(message, args) {
    const prefix = message.prefix;
    if(!args[0]) {
      ping('onionkraft.apexmc.co', 25621)
          .then((response) => {
              if(!response) {
                message.channel.send("Onionkraft is offline.")
              } else {message.channel.send("Onionkraft is online!")}
            })
          .catch((error) => {
              if(error) {message.channel.send("Onionkraft is offline.")}
            });
    } else {
      ping(args[0], 25565)
          .then((response) => {
              if(!response) {
                message.channel.send("This server is offline.")
              } else {message.channel.send(args[0] + " is online!")}
            })
          .catch((error) => {
              if(error) {message.channel.send(args[0] + " is offline.")}
          });
    }
  }
}
