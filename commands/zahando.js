const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You are not worthy.");
    if(!args[0]) return message.channel.send("Specify an amount. | **Usage:** `>zahando <amount>`");
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Scraped away **${args[0]}** messages.`).then(msg => msg.delete(5000));

        let zaHando = new Discord.RichEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setDescription(`**Bulk Delete issued in ${message.channel}**\n**${args[0]} messages deleted.**`)
        .setTimestamp()
        .setColor("#e74c3c")
    
        let sChannel = bot.channels.find(r => r.name === 'kananlogs');
        sChannel.send(zaHando);
    })
}

module.exports.help = {
    name: "zahando"
}