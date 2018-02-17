module.exports = {
  myWrite: function (logFileInfo, channelName) {
    const fs = require('fs');
    channelName += ".txt";
    fs.appendFile(channelName, logFileInfo, function (err) {
      if (err) {
        console.log("Print Writer has failed");
      }
    });
  }
};