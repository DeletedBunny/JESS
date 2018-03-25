const Discord = require("discord.js");
const Command = require("../core/command.js");


class mute extends Command {

    constructor(client) {
        super(client, {
            name: 'avatar',
            description: 'mutes a user indefinitely, or for a set amount of time.',
            perms: "MANAGE_MESSAGES"
        });
    }

    static async run(jbot, message, args) {
        message.channel.send("Incorrect syntax. You must specify a user to mute");

    }

    static async runPost(jbot, message, args) {
        if (typeof (message.mentions.members.first()) === "undefined") {
            message.channel.send("Incorrect syntax. You must specify a user to mute");  //await removed
            return false;
        }
        // Find Muted role.
        var role = message.guild.roles.find("name", "Muted");

        // Check if role exists so bot can add to muted role.
        if (role === null) {
            message.channel.send("Muted role doesn't exist. Please create a role named Muted where the user does not have permissions to write messages.");  //await removed
            return;
        }
        // Get mentioned user and set their role.
        var member = message.mentions.members.first();
        await member.setRoles([role]).catch(console.error);
        message.channel.send(`${member}'s role was set to muted`);  //await removed
    }
}

module.exports = mute;
module.exports.name = mute;