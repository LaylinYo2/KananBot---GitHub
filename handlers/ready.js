const {bot} = require("../app");
const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
bot.commands = new Discord.Collection();
bot.on("ready", async () =>{
    console.log(`${bot.user.username} is ready! Initialized version 2.0! Connected to ${bot.guilds.size} servers.`);
    bot.user.setActivity("Huseey's Server", {type: "WATCHING"});
});
