const Discord = require("discord.js");
const fs = require("fs");
var pastRandom;


var playing = false;

class trivia {


    static async run(jbot, message, args) {

        var filesA = [];
        var filesX = [];
        var triviaEmbed = [];
        var files = fs.readdirSync("./trivia");
        for (var i in files) {
            var name = "./trivia" + '/' + files[i];
            if (fs.statSync(name).isDirectory()) {
                getFiles(name, filesA);
            } else {
                var newname = name.split("!");
                filesA.push(newname[1].slice(0, -4));
                console.log(newname[1].slice(0, -4));
                filesX.push(newname[0].slice(9, 12));
                console.log(newname[0].slice(9, 12));
                //filesX.push(newname[0].slice(9, 11));
            }
        }

        for (var i = 0; i < (filesA.length); i++) {

            triviaEmbed.push("\n" + (i + 1) + ". " + (filesA[i]) + ": " + (filesX[i]));
        }
        console.log(triviaEmbed);
        var triviaDiscEmbed = triviaEmbed.join(" ");



        let embed = new Discord.RichEmbed()
            .setColor("#9B59B6")
            .addField("Games", `${triviaDiscEmbed}`);

        var indexN = filesX[i];
        await message.channel.send(embed)
            .then(() => {
                message.channel.awaitMessages(function checkGame(response) {
                    for (var i = 0; i < (filesA.length); i++) {

                        if (response.content === filesX[i]) {
                            indexN = filesA[i];
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
                        var triviaList = fs.readFileSync(`./trivia/${collected.first().content}!${indexN}.txt`).toString().split('\n');
                        message.channel.send(`Trivia initialized: ${indexN}`);
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

        while(randomNumber === pastRandom)
        {
            randomNumber = Math.floor(Math.random() * triviaList.length);
        }
            pastRandom = randomNumber;

        console.log(triviaList[randomNumber])

        var triviaParts = triviaList[randomNumber].split('`');

        //ask question from file

        //message.channel.send(triviaList[randomNumber]);

        console.log(triviaParts[1]);
        await message.channel.send(triviaParts[0])
            //check for answers from file
            


            .then(() => {
                message.channel.awaitMessages(response => response.content.toLowerCase()=== (triviaParts[1] || triviaParts[2] || triviaParts[3] || triviaParts[4]) || triviaParts[5], {
                    max: 1,
                    time: 30000,
                    errors: ['time'],
                })
                    .then((collected) => {
                        message.channel.send("you got it right");
                        this.playingTrivia(jbot, message, args, triviaList);
                    })
                    .catch(() => {
                        message.channel.send('error');
                    });
            });

    };
}



module.exports = trivia;
module.exports.name = trivia;