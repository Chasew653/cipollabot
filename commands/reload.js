
module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	args: true,
	execute(message, args, client) {
		const prefix = message.prefix;
		//Calls constants
		const commandName = args[0].toLowerCase();
		const command = client.commandFilePaths.get(commandName);

		//Making sure it's a valid command
		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
		}
		let commandPath = command.replace("commands\\", ".\\");

		//Clear cache
		delete require.cache[require.resolve(`${commandPath}`)];
		//Reponds
		try {
			const newCommand = require(`${command.replace("commands\\", ".\\")}`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Command \`${args[0].toLowerCase()}\` was reloaded!`);
			console.log('RELOADED COMMAND NEW VERSION AFTER THIS LINE!!!-----------------------------------------');
		} catch (error) {
			console.log(error);
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};
