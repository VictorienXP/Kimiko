const Discord = require('discord.js');
require('../discord-patch.js');

module.exports.run = async(bot, msg, args) => {

	if (args[0] == 'me')
		msg.reply('u suck');
	else
		msg.channel.send(args.join(' ') + ' sucks');

}

module.exports.help = {
	name: "insult"
}
