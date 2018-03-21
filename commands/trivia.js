const Discord = require("discord.js");
const fs = require("fs");

var playing = false;

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
                        var triviaList = fs.readFileSync("./trivia/wow.txt").toString().split('\n');
                        //console.log(JSON.stringify(triviaList, null, 4));
                        message.channel.send(`Trivia initialized: ${collected.first().content}`);
                        this.playingTrivia(jbot, message, args, triviaList);
                    })
                    .catch(() => {
                        message.channel.send('Trivia Choice error. Please re-try');
                    });
            });
    }

    static async runPost(jbot, message, args) {
        this.run(jbot, message, args);
    }

    static async playingTrivia(jbot, message, args, triviaList) {

        var randomNumber = Math.floor(Math.random() * triviaList.length);

        console.log(randomNumber);


            //ask question from file
            //check for answers from file
            

            //won't be using this methodology 
            //await jbot.on("message", async message => {
            //if (message.author.bot) return;
            //if (message.channel.type === "dm") return;
        };
    }



module.exports = trivia;
module.exports.name = trivia;