const Discord = require('discord.js');
const config = require('./config.json');

Discord.User.prototype.is_bot_owner = function() {
	return this.id == config.owner;
}

Discord.User.prototype.is_bot_admin = function() {
	return this.is_bot_owner();
}
