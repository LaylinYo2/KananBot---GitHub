const Discord = require("discord.js");
const Config = require("./config.json");
const fs = require("fs");

const bot = new Discord.Client({disableEveryone: true});

require("./functions")(bot);

module.exports = {
  bot: bot
};

//console say
let y = process.openStdin()
y.addListener("data", res => {
  let x = res.toString().trim().split(/ +/g)
  bot.channels.get("375379540643545090").send(x.join(" "));
});

bot.login(process.env.token);
