const Discord = require('discord.js');
require('../discord-patch.js');

module.exports.run = async(bot, msg, args) => {

	if (msg.author.is_bot_owner()) {
		msg.channel.send(`See you later ${msg.author}! <:KimikoWink:442090482307301398>`);
		bot.destroy();
		console.log(`${msg.author.tag} requested shutdown.`);
		return true;
	}
	else {
		msg.reply(bot.owner_only_msg);
		return false;
	}

}

module.exports.help = {
	name: "shutdown"
}
