const Discord = require("discord.js");
const config = require("../config.json");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You are not worthy.")
    
    if(!bot.lockit) bot.lockit = []
    let time = args.join(' ');
    let validUnlocks = ['end', 'timeout'];
    if (!time) return message.channel.send('Specify a duration. | **Usage:** `>dio <duration>`')

    if(validUnlocks.includes(time)) {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: true
        }).then(() => {
            message.channel.send('Time has begun to move again.');
            clearTimeout(bot.lockit[message.channel.id]);
            delete bot.lockit[message.channel.id];
        }).catch(error => {
            console.log(error)
        });
    } else {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        }).then(() => {
            message.channel.send('**ZA WARUDO!**').then(() => {

                bot.lockit[message.channel.id] = setTimeout(() => {
                    message.channel.overwritePermissions(message.guild.id, {
                        SEND_MESSAGES: true
                    }).then(message.channel.send('Time has begun to move again.')).catch(console.error)
                }, ms(time));
            })
        }).catch(error => {
            console.log(error)
        })
    }
};

module.exports.help = {
    name: "dio"
}
