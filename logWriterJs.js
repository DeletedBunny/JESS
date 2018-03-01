module.exports = {

  //function to check directory exists or not
  checkDir: function(fs, dir, callback) {
    //returns error if it doesn't exist, error is -4058 according to cmd when tested
    fs.stat(dir, function(err, stats) {
      if(err && err.errno === -4058) {
        //creates folder if it doesn't exist
        fs.mkdir(dir, callback);
      }
      else {
        //in case of other errors
        callback(err);
      }
    });
  },
  
  myWrite: function (logFileInfo, channelName, guildName) {
    const fs = require('fs');   
    //directory to create or go to
    dir = "./" + guildName;
    //call function checkDir from this file
    module.exports.checkDir(fs, dir, function(error) {
      //if there is an error that isn't handled in the function
      if(error) {
        console.log("Error with dir: ", error);
      }
      //otherwise write to file or create file
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