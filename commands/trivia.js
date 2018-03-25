const Discord = require("discord.js");
const fs = require("fs");
const Command = require("../core/command.js");
var pastRandom;
var triviaSeconds = 10000;
var playing = false;
var nextm = null;

class trivia extends Command {

    constructor(client) {
        super(client, {
            name: 'trivia',
            description: 'Trivia Game that loops until stopped.',
            perms: "SEND_MESSAGES"
        });
    }

    static async nextQuestion(jbot, message, args, triviaList) {

        nextm = await message.channel.send("Next question");
        this.playingTrivia(jbot, message, args, triviaList);

    }

    static async returnPerms() {
        //return this.perms;
        console.log("hi" + this.perms);
    }

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
            }
        }

        for (var i = 0; i < (filesA.length); i++) {

            triviaEmbed.push("\n" + (i + 1) + ". " + (filesA[i]) + ": " + (filesX[i]));
        }
        console.log(triviaEmbed);
        var triviaDiscEmbed = await triviaEmbed.join(" ");

        let embed = new Discord.RichEmbed()
            .setColor("#9B59B6")
            .addField("Games", `${triviaDiscEmbed}`);

        var indexN = filesX[i];
        await message.channel.send(embed)
            .then(async() => {
                await message.channel.awaitMessages(function checkGame(response) {
                    for (var i = 0; i < (filesA.length); i++) {

                        if (response.content === filesX[i]) {
                            indexN = filesA[i];
                            return true;
                        }
                        else return false;
                    }
                }, {
                        max: 1,
                        time: triviaSeconds,
                    })
                    .then(async (collected) => {
                        var triviaList = await fs.readFileSync(`./trivia/${collected.first().content}!${indexN}.txt`).toString().split('\n');
                        await message.channel.send(`Trivia initialized: ${indexN}`);
                        playing = true;
                        this.playingTrivia(jbot, message, args, triviaList);
                    })
                    .catch(async (error) => {
                        await message.channel.send("You did not choose a correct Trivia Choice. Try again with .jess trivia");
                        console.log(error);
                        return;
                    });
            });
    }

    static async runPost(jbot, message, args) {
        if (args[1] === "stop") {
            playing = false;
            message.channel.send("Trivia has been shut off.")

        }
        else {
            this.run(jbot, message, args);
        }
    }

    static async playingTrivia(jbot, message, args, triviaList) {
        if (!playing) return false;

        var randomNumber = await Math.floor(Math.random() * triviaList.length);

        while (randomNumber === pastRandom) {
            randomNumber = await Math.floor(Math.random() * triviaList.length);
        }
        pastRandom = randomNumber;

        var triviaParts = await triviaList[randomNumber].split('`');

        //Trivia Answer Checking.
        //console.log(triviaParts[1]);
        await message.channel.send(triviaParts[0]);

        if (nextm !== null) {
            await nextm.delete();
            nextm = null;
        }


        await message.channel.awaitMessages(response => response.content.toLowerCase() === (triviaParts[1]), {
            max: 1,
            time: triviaSeconds,

        }
        )
            .then(async(collected) => {
                //message.channel.send("test"+collected.first().content);
                if (collected.first().content === null) return false;
                await message.channel.send(message.author.username + " is Correct!");
                this.nextQuestion(jbot, message, args, triviaList);

            })
            .catch(async(error) => {
                if (!playing) return false;
                await message.channel.send(`No one got it, the answer was: ${triviaParts[1]}`);
                this.nextQuestion(jbot, message, args, triviaList);

            });
    };

};

module.exports = trivia;
module.exports.name = trivia;