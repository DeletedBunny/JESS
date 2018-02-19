const Discord = require("discord.js");
const logger = require("./logWriterJs.js");
const newdate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

const bot = new Discord.Client();

const auth = require("./auth.json");

bot.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log('Bot has started, with ' + bot.users.size + ' users, in ' + bot.channels.size + ' channels of ' + bot.guilds.size + ' guilds');
});

bot.on("guildCreate", guild => {
    // This event triggers when the bot joins a server.
    console.log('New guild joined: ' + guild.name +' (id: ' + guild.id + '). This guild has ' + guild.memberCount + ' members!');
    
    //Create folder and files.
    for(chan of guild.channels) {
        logger.myWrite("----- Start of Log -----", guild.name, "@" + guild.id);
    }
});

bot.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a server.
    console.log('I have been removed from: ' + guild.name + ' (id: ' + guild.id + ')');
});

bot.on("message", async message => {

    //If the message is from a bot, don't process it.
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    //Set Variable to Format Message Date/Time/Author/Username/Content
    var textInfo = (newdate + " " + message.author + " " + message.author.username + ": " + message.content + "\r\n");
    
    //Use function myWrite to save message to a channel named file in a server named directory.
    logger.myWrite(textInfo, message.channel.name, "@" + message.guild.id);

    //If the message doesn't have the identifier .jess don't process it.
    if(message.content.indexOf(auth.prefix) !== 0) return;

    //Split and trim the message content into an array of args = ["arg1", "arg2", "arg3"]
    //Ignores prefix because of slice command
    const args = message.content.slice(auth.prefix.length).trim().split(/ +/g);
    
    //Args to lower case for processing in case people write ARG1 instead of arg1.
    const command = args.shift().toLowerCase();

    //command for adding user's to the muted role.
    if(command === "mute") {

        //Boolean for if someone was found to mute.
        var muted = false;

        //Find Muted role.
        var role = message.guild.roles.find("name", "Muted");

        //Check if role exists so bot can add to muted role.
        if(role === null) {
            message.channel.send("Muted role doesn't exist. Please create a role named Muted where the user does not have permissions to write messages.");
            return;
        }
        //Get mentioned user and set their role.
        var member = message.mentions.members.first();
        member.setRoles([role]).catch(console.error);
        muted = true;

        //If no one was found then send message about it.
        if(!muted) {
            message.channel.send("Can't find that person to mute.");
            return;
        }
        
    }

    if(command === "userinfo"){

        var member = message.mentions.members.first();
        let embed = new Discord.RichEmbed()
        .setColor("#9B59B6")
        .addField("Full Username", `${member.user.username}#${member.user.discriminator}`)
        .addField ("ID", member.user.id)
        .addField("Created At", member.user.createdAt);
        message.channel.sendEmbed(embed);
        
    }

});

//Log the bot in.
bot.login(auth.token);