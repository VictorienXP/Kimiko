const Discord = require('discord.js');
require('../discord-patch.js');

module.exports.run = async(bot, msg, args) => {

	bot.channels.get(args[0]).send(`<a:${args[1]}:${args[2]}>`);

}

module.exports.help = {
	name: "saeic"
}
