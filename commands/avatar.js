const Discord = require("discord.js");


class avatar {

    static async run(jbot, message, args) {
        let loadMessage = await message.channel.send("Loading "+message.author.username+"'s Avatar")

        await message.channel.send({files:[{
            attachment: message.author.displayAvatarURL,
            name: "avatar.png"
        }]});

        await loadMessage.delete();
    }

    static async runPost(jbot, message, args) {

        if (typeof (message.mentions.members.first()) === "undefined") {
            this.run(jbot, message, args);
            return;
        }
        
        let member = message.mentions.members.first();
        let loadMessage = await message.channel.send("Loading "+member.user.username+"'s Avatar")

        await message.channel.send({files:[{
            attachment: member.user.displayAvatarURL,
            name: "avatar.png"
        }]});
        await loadMessage.delete();
}

}

module.exports = avatar;
module.exports.name = avatar;