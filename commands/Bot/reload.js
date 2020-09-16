const errorEmbed = require('../../embeds/errorEmbed.json');
const successEmbed = require('../../embeds/reloadSuccess.json')
module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	args: true,
	execute(message, args) {
		const prefix = message.prefix;
		//Calls constants
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		//Making sure it's a valid command
		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
		}
		//Clear cache
		delete require.cache[require.resolve(`./${command.name}.js`)];
		//Reponds
		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Command \`${command.name}\` was reloaded!`, successEmbed);
			console.log('RELOADED COMMAND NEW VERSION AFTER THIS LINE!!!-----------------------------------------');
		} catch (error) {
			console.log(error);
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``, errorEmbed);
		}
	},
};
