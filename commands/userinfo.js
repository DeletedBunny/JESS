const Discord = require("discord.js");

class userinfo {

    static async run(jbot, message, args) {
        let loadMessage = await message.channel.send("Loading "+message.author.username+"'s User Information")
        let embed = new Discord.RichEmbed()
            .setColor("#9B59B6")
            .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
            .addField("ID", message.author.id)
            .addField("Created At", message.author.createdAt);
        // Send user-specific information to the channel.
        await message.channel.send(embed);
        await loadMessage.delete();
    }

    static async runPost(jbot, message, args) {

        // Get mentioned user for user info checking. 
        //var member = message.mentions.members.first();
        if (typeof (message.mentions.members.first()) === "undefined") {
            this.run(jbot, message, args);
            return;
        }
        
        let member = message.mentions.members.first();
        let loadMessage = await message.channel.send("Loading "+member.user.username+"'s Avatar")

        // Set embed properties and fields for user info output.
        let embed = new Discord.RichEmbed()
            .setColor("#9B59B6")
            .addField("Full Username", `${member.user.username}#${member.user.discriminator}`)
            .addField("ID", member.user.id)
            .addField("Created At", member.user.createdAt);
        // Send user-specific information to the channel.
        await message.channel.send(embed);
        await loadMessage.delete();
    }

}

module.exports = userinfo;
module.exports.name = userinfo;







