const Discord = require("discord.js");

const playing = false;

class trivia {


    static async run(jbot, message, args) {
        let embed = new Discord.RichEmbed()
            .setColor("#9B59B6")
            .addField("Games", "1. South Park \n2. World of Warcraft");
        await message.channel.send(embed)
        .then(() => {
            message.channel.awaitMessages(response => response.content === 'southpark', {
                max: 1,
                time: 30000,
                errors: ['time'],
            })
                .then((collected) => {
                    playing = true;
                    message.channel.send("Playing trivia m8!");
                    this.playingTrivia(jbot, message, args);
                })
                .catch(() => {
                    message.channel.send('Trivia timed out!');
                });
        });
    }

    static async runPost(jbot, message, args) {
        this.run(jbot, message, args);
    }

    static async playingTrivia(jbot, message, args) {
        jbot.on("message", async message => {
            await message.channel.send("Playing trivia m8!");
        });
    }

}

module.exports = trivia;
module.exports.name = trivia;