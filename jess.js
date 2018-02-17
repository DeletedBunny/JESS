const Discord = require("discord.js");

const bot = new Discord.Client();

const auth = require("./auth.json");

bot.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log('Bot has started, with ' + bot.users.size + ' users, in ' + bot.channels.size + ' channels of ' + bot.guilds.size + ' guilds');
});

bot.on("guildCreate", guild => {
    // This event triggers when the bot joins a server.
    console.log('New guild joined: ' + guild.name +' (id: ' + guild.id + '). This guild has ' + guild.memberCount + ' members!');
});

bot.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a server.
    console.log('I have been removed from: ' + guild.name + ' (id: ' + guild.id + ')');
});

bot.on("message", async message => {

    //If the message is from a bot, don't process it.
    if(message.author.bot) return;

    //If the message doesn't have the identifier .jess don't process it.
    if(message.content.indexOf(auth.prefix) !== 0) return;
});

//Log the bot in.
bot.login(auth.token);