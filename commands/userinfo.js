const Discord = require("discord.js");

class userinfo {

    static async run(jbot, message, args) {
        let embed = new Discord.RichEmbed()
            .setColor("#9B59B6")
            .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
            .addField("ID", message.author.id)
            .addField("Created At", message.author.createdAt);
        // Send user-specific information to the channel.
        message.channel.send(embed);
    }

    static async runPost(jbot, message, args) {

        //console.log("post command is "+postcom);    
        //if (message!=="") console.log("test "+ message + args);
        // Get mentioned user for user info checking. 
        //var member = message.mentions.members.first();
        if (typeof (message.mentions.members.first()) !== "undefined") {
            var member = message.mentions.members.first();
        }
        else {
            this.run(jbot, message, args);
            return;
        }
        // Set embed properties and fields for user info output.
        let embed = new Discord.RichEmbed()
            .setColor("#9B59B6")
            .addField("Full Username", `${member.user.username}#${member.user.discriminator}`)
            .addField("ID", member.user.id)
            .addField("Created At", member.user.createdAt);
        // Send user-specific information to the channel.
        message.channel.send(embed);
    }

}

module.exports = userinfo;
module.exports.name = userinfo;







