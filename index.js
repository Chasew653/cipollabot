
const fs = require('fs');
const Discord = require('discord.js');
const Collection = require('discord.js')
const { token, google_api_key } = require('./config.json');
const { readdirSync } = require('fs');
const { join } = require('path');
const dmAction = require('./nonCommandActions/dmReport.js');
const mongoose = require('mongoose');
const gM = require('./models/guildsModel.js')
mongoose.connect('mongodb://localhost/guildData', {useNewUrlParser: true, useUnifiedTopology: true});
const recursive = require('recursive-readdir');
const { info } = require('console');



let profTest = /.{0,8}f.{0,8}u.{0,8}c.{0,8}|.{0,8}n.{0,8}i.{0,8}[gb]{2,}.{0,17}|.{0,8}c.{0,8}u.{0,8}n.{0,8}t.{0,8}|.{0,8}[fp].{0,8}[ha].{0,8}[g].{0,30}/gi;

function isAuth(message) {
	let isAuth = true;

	profTest.test(message.content) ? isAuth = false : isAuth = true;


	let cleanMsg = message.content.replace(profTest, "heck");

	if(message.channel.type === "dm" || message.channel.id === "755857960433090600" || message.channel.id === "750892065822474331") {isAuth = true};


	return [isAuth, cleanMsg];
}


const client = new Discord.Client();
client.commands = new Discord.Collection();
client.commandFilePaths = new Discord.Collection();
client.queue = new Map();

async function commandSortDecoder() {
	const commandFiles = await recursive('./commands');
	for (const file of commandFiles) {
		const command = require(`./${file}`);
		client.commands.set(command.name, command);
		client.commandFilePaths.set(command.name, file);

	}

};

commandSortDecoder();

/*
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
*/
const cooldowns = new Discord.Collection();


client.once('ready', () => {
  console.log('Ready!');
  client.user.setActivity("with onions", { type: 'PLAYING' });
  client.user.setPresence({ activity: { name: 'with onions' }, status: 'online' })
  console.log('Status set!');
});

client.on('message', async (message) => {
	if(message.author.bot) return;

	if(!isAuth(message)[0]) return message.delete().then(() => client.channels.cache.get('751171817573580971').send(`User ${message.author} said:\n${message.content}`)).then(() => message.reply("no don't"));

	if(message.content.startsWith("?")) {
		let bit = message.content.replace("?", "").replace(" ", "-");
		try {
			client.infoBit = require(`./infoBits/${bit}`);
		} catch (error) {e
			return message.channel.send("Uh oh! That's not a bit!");
		}

		try {
			client.infoBit.giveBit(message);
		} catch(error) {
			message.channel.send("It seems something went wrong with sending or searching for that bit!");
			console.log(error);
		}
	}


	if(message.channel.type === 'text') {
		let gPDoc = await gM.findOne({id: message.guild.id});
		const prefix = gPDoc.prefix;
		message.prefix = prefix;
		const gSDoc = await gM.findOne({id: message.guild.id});
		message.gSaves = gSDoc;
	} else {
		message.prefix = '.';
		message.gSaves = null;
	};

	const args = message.content.slice(message.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if(message.channel.id === "754426779996782633") {
		return message.react("751174164303446137").then(message.react("751174121655894136"));
	}

	if(message.channel.type === 'dm' && !message.content.startsWith(message.prefix) && !message.author.bot) {
		try {
			message.prefix = ""
			dmAction.execute(message, args, client);
		} catch(error) {
			message.channel.send("There was an error!");
			console.error(error);
		}
		return;
	};

	if (!message.content.startsWith(message.prefix) || message.author.bot) return;

	if (!client.commands.has(commandName)) return message.react('752316461061767170');

	const command = client.commands.get(commandName);

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${message.prefix}${command.name} ${command.usage}\``;
		}
		message.react('752316461640318988');
		return message.channel.send(reply);
	}


	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	try {
		command.execute(message, args, client);
	    } catch (error) {
				console.error(error);
				message.reply('there was an error trying to execute that command!');
				message.react('752316461967736842');
			}


});


client.login(token);
