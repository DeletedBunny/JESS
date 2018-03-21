const Discord = require("discord.js");
const newdate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
const auth = require("./auth.json");
const fs = require("fs");


class Jess extends Discord.Client {
    constructor(options) {
        super(options);
        this.logger = require("./logging/logWriter");
        this.commands = new Discord.Collection();
    };

}
const jbot = new Jess();


fs.readdir("./commands/", (err, dirs) => {
    if (err) console.error(err);

    let importCs = dirs.filter(f => f.split(".").pop() === "js");

    importCs.forEach((f, i) => {
        let commandImport = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} imported`);
        jbot.commands.set(commandImport.name, commandImport);

    });
});



jbot.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log('Bot has started, with ' + jbot.users.size + ' users, in ' + jbot.channels.size + ' channels of ' + jbot.guilds.size + ' guilds');
    console.log(jbot.commands);
});

jbot.on("guildCreate", guild => {
    // This event triggers when the bot joins a server.
    console.log('New guild joined: ' + guild.name + ' (id: ' + guild.id + '). This guild has ' + guild.memberCount + ' members!');

    // Create Server-Specific content directory.
    for (chan of guild.channels) {
        logger.myWrite("----- Start of Log -----", guild.name, "@" + guild.id);
    }
});

jbot.on("guildDelete", guild => {
    // This event triggers when the bot is removed from a server.
    console.log('I have been removed from: ' + guild.name + ' (id: ' + guild.id + ')');
});

jbot.on("message", async message => {

    // If the message is from a bot, don't process it.
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let textInfo = (newdate + " " + message.author + " " + message.author.username + ": " + message.content + "\r\n");

    // Use function myWrite to save message to a channel named file in a server named directory.

    jbot.logger.logUtility(textInfo, message.channel.name, "@" + message.guild.id, "cLog");


    // If the message doesn't have the identifier .jess don't process it.
    if (message.content.indexOf(auth.prefix) !== 0) return;

    // Split and trim the message content into an array of args = ["arg1", "arg2", "arg3"]
    // Ignores prefix because of slice command
    const args = message.content.slice(auth.prefix.length).trim().split(/ +/g);

    //Args to lower case for processing in case people write ARG1 instead of arg1.
    const command = args[0].toLowerCase();

    let execom = jbot.commands.get(command);
    if (typeof args[1] === "undefined") {
        if (execom) execom.run(jbot, message, args);
    }
    else {
        if (execom) execom.runPost(jbot, message, args);
    }

    /*// command for adding user's to the muted role.
    if (command === "mute") {

        // Boolean for if someone was found to mute.
        var muted = false;

        // Find Muted role.
        var role = message.guild.roles.find("name", "Muted");

        // Check if role exists so bot can add to muted role.
        if (role === null) {
            message.channel.send("Muted role doesn't exist. Please create a role named Muted where the user does not have permissions to write messages.");
            return;
        }
        // Get mentioned user and set their role.
        var member = message.mentions.members.first();
        member.setRoles([role]).catch(console.error);
        muted = true;

        // If no one was found then send message about it.
        if (!muted) {
            message.channel.send("Can't find that person to mute.");
            return;
        }

    }

    */
});

//Log the bot in.
jbot.login(auth.token);