module.exports = {
    myWrite: function (logFileInfo) {
        const fs = require('fs');
        fs.appendFile('messageLog.txt', logFileInfo, function (err) {
          if (err) {
            console.log("Print Writer has failed");
           }
        });
    }

  };