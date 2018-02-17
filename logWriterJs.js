module.exports = {
  myWrite: function (logFileInfo, channelName, guildName) {
    const fs = require('fs');
    const mkdirp = require('mkdirp');
    mkdirp("/" + guildName, function(err) {
      if(err) {
        console.log("Make Dir has failed");
      }
    })
    channelName += ".txt";
    fs.appendFile(channelName, logFileInfo, function (err) {
      if (err) {
        console.log("Print Writer has failed");
      }
    });
  }
};