const Discord = require('discord.js');
require('./discord-patch.js');
const config = require('./config.json');
const bot = new Discord.Client();
const fs = require("fs");
bot.commands = new Discord.Collection()

fs.readdir("./commands/", (err, files) => {

	if(err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js");

	if(jsfile.length <= 0) {
		console.log("Couldn't find commands.");
		return;
	}

	jsfile.forEach((f, i) =>{
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});

});

bot.owner_only_msg = function() {
	return `only <@!${config.owner}>-sama can do this. <a:TsumikiOw:442094739744096256>`;
}

bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}!`);
	bot.user.setPresence({ game: { name: 'you fap', type: 'WATCHING' } });
	bot.prefixMention = new RegExp(`^<@!?${bot.user.id}> `);
	if (config.startgreet && bot.channels.get(config.startgreet))
		bot.channels.get(config.startgreet).send(`I'm back <@!${config.owner}>!`);
});

bot.on('message', msg => {

	const prefix = msg.content.match(bot.prefixMention) ? msg.content.match(bot.prefixMention)[0] : config.prefix;

	if (msg.content.startsWith(prefix)) {

		const message = msg.content.slice(prefix.length);

		//console.log(message)

		if (message.startsWith(' ')) {
			if (msg.author.is_bot_admin()) {
				const smsg = message.slice(1);
				msg.channel.send(smsg);
				if (msg.channel.type !== 'dm')
					msg.delete();
				console.log(`I've just said: "` + smsg + `" because of ${msg.author.tag}`);
			}
			else {
				msg.reply(owner_only_msg);
				console.log(`${msg.author.tag} tried to make me say nasty things.`);
			}
		}
		else {
			let content = message.split(" ");
			let command = content[0];
			let args = content.slice(1);

			let commandfile = bot.commands.get(command);
			if (commandfile)
				commandfile.run(bot, msg, args);
		}
	}

});

bot.login(config.token);
