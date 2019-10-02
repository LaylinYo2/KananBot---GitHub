const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"))
   
    //>warn @user <reason>
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Insufficient permission."); //if the user doesnt have manage roles perm
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]) //To find the target
    if(!wUser) return message.reply("Couldn't find user | **Usage:** `>warn @user <reason>`") //Target wasnt specified lol
    if(wUser.hasPermission("ADMINISTRATOR")) return message.reply(":clown: You tried. :clown:") //You cant warn someone with admin perm
    let reason = args.join(" ").slice(22); //warn reason
    if(!reason) return message.channel.send("Specify a reason | **Usage:** `>warn @user <reason>`"); //missing reason

    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

        warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    }); //this issues the warn to be done and written in the warnings.json

    let warnEmbed = new Discord.RichEmbed()
    .setAuthor(`Punishment | ${wUser.user.tag} | Warn`, wUser.user.displayAvatarURL)
    .setDescription(`**Target:** ${wUser}\n \n**Issued By:** ${message.author}\n \n**Issued Reason:** ${reason}\n \n**Issued In:** ${message.channel}`)
    .setColor('#e74c3c')
    .setTimestamp()
    .setFooter(`ID: ${wUser.id}`); //this is the embed for logs purposes

    let autobanEmbed = new Discord.RichEmbed()
    .setAuthor(`Punishment | ${wUser.user.tag} | Auto-Ban`, wUser.user.displayAvatarURL)
    .setDescription(`**Target:** ${wUser}\n \n**Issued By:** ${bot.user}\n \n**Issued Reason:** 3 Warnings\n \n**Issued In:** Console`)
    .setColor("#e74c3c")
    .setTimestamp()
    .setFooter( `ID: ${wUser.id}`)

    let autobanlog = message.guild.channels.find(`name`, "modlogs");
    if(!autobanlog) return message.channel.send("Couldn't find log channel")

    let warnchannel = message.guild.channels.find(`name`, "modlogs"); //has to find modlogs channel to post the embed
    if(!warnchannel) return message.channel.send("Channel doesn't exist"); //channel doesnt exist

    warnchannel.send(warnEmbed).then(() => {
        wUser.send(`You've been **warned** in **${message.guild.name}** for: **${reason}**.`)
    }) //sends the embed in modlogs upon warn

    if(warns[wUser.id].warns == 3){
        wUser.send(`You've been **permanently banned** from **${message.guild.name}** for: **3 Warnings**. If you feel this action is unjustified, contact @Huseey#6669 (<@215199639027056640>).`).then(function() {
            message.guild.member(wUser).ban("Automod Ban - 3 Warnings");
        })
        
  
        let wallofshame = message.guild.channels.find(c => c.name === "wall-of-shame"); // has to find wall of shame channel to post the ban message below
  
        wallofshame.send(`${wUser} was banned by **Console** for **3 warnings**.`)

        autobanlog.send(autobanEmbed)
        }
        console.log(warns)
    
    }
    
    


module.exports.help = {
    name: "warn"
} 