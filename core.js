module.exports = {
    myWrite: function (schlong) {
        const fs = require('fs');
        fs.appendFile('messageLog.txt', schlong, function (err) {
          if (err) {
            console.log("Print Writer has failed");
           }
        });
    }

  };