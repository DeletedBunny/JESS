const Discord = require("discord.js");
const fs = require("fs");


var playing = false;

class trivia {


    static async run(jbot, message, args) {

        var filesA = [];
        var files = fs.readdirSync("./trivia");
        for (var i in files) {
            var name = "./trivia" + '/' + files[i];
            if (fs.statSync(name).isDirectory()) {
                getFiles(name, filesA);
            } else {
                filesA.push(name.slice(9).slice(0, -4));
            }

        }

        let embed = new Discord.RichEmbed()
            .setColor("#9B59B6")
            .addField("Games", "1. South Park \n2. World of Warcraft");


        await message.channel.send(embed)
            .then(() => {
                message.channel.awaitMessages(function checkGame(response) {
                    for (var i = 0; i < (filesA.length + 1); i++) {

                        if (response.content === filesA[i]) {
                            return true;

                        }
                    }
                }, {
                        max: 1,
                        time: 30000,
                        errors: ['time'],
                    })
                    .then((collected) => {
                        playing = true;
                        var triviaList = fs.readFileSync(`./trivia/${collected.first().content}.txt`).toString().split('\n');
                        message.channel.send(`Trivia initialized: ${collected.first().content}`);
                        this.playingTrivia(jbot, message, args, triviaList);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            });
    }

    static async runPost(jbot, message, args) {
        this.run(jbot, message, args);
    }

    static async playingTrivia(jbot, message, args, triviaList) {

        var randomNumber = Math.floor(Math.random() * triviaList.length);

        console.log(triviaList[randomNumber])

        var triviaParts = triviaList[randomNumber].split('`');

        //ask question from file

        await message.channel.send(triviaParts[0])
            //check for answers from file

            .then(() => {
                message.channel.awaitMessages(response => response.content === (triviaParts[1] || triviaParts[2] || triviaParts[3] || triviaParts[4]), {
                    max: 1,
                    time: 30000,
                    errors: ['time'],
                })
                    .then((collected) => {
                        console.log("bob");
                    })
                    .catch(() => {
                        message.channel.send('rawr');
                    });
            });








        //won't be using this methodology 
        //await jbot.on("message", async message => {
        //if (message.author.bot) return;
        //if (message.channel.type === "dm") return;
    };
}



module.exports = trivia;
module.exports.name = trivia;