const {bot} = require("../app");
const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
bot.commands = new Discord.Collection();

bot.on("guildMemberBan", async member => {

    let logEmbed = new Discord.RichEmbed()
    .setAuthor(`Member banned`, member.user.displayAvatarURL)
    .setColor("#41f480")
    .setDescription(`${member} | **${member.user.username}** has been banned.`)
    .setFooter(`ID: ${member.id}`)
    .setTimestamp()
  
    let logchannel = member.guild.channels.find(r => r.name === 'kananlogs');
  
    logchannel.send(logEmbed);
    //member.addRole(member.guild.roles.find(role => role.name === "Members"));
  });
