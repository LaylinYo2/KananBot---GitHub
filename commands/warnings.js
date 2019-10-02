const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    
    let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Insufficient permission.");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if (!wUser) return message.channel.send("Couldn't find user. | **Usage:** `>warn @user <reason>`")
    let warnlevel = warns[wUser.id].warns;

    message.channel.send(`<@${wUser.id}> has ${warnlevel} warnings.`);


}

module.exports.help = {
    name: "warnings"
}
