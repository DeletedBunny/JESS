module.exports = {
  
  checkDir: function(fs, dir, callback) {
    fs.stat(dir, function(err, stats) {
      if(err && err.errno === -4058) {
        fs.mkdir(dir, callback);
      }
      else {
        callback(err);
      }
    });
  },
  
  myWrite: function (logFileInfo, channelName, guildName) {
    const fs = require('fs');   
    dir = "./" + guildName;
    module.exports.checkDir(fs, dir, function(error) {
      if(error) {
        console.log("Error with dir: ", error);
      }
      else {
        channelName = dir + "/" + channelName + ".txt";
        fs.appendFile(channelName, logFileInfo, function (err) {
          if (err) {
            console.log("Print Writer has failed");
          }
        });
      }
    });
  }
};