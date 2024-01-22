const fs = require('fs');
const path = require('path');
const writableStream = fs.createWriteStream(__dirname + '/project-dist/bundle.css');

fs.readdir(__dirname + '/styles', (err, files) => {

  if (err) {
    throw err;
  }

  files.forEach(file => {
    fs.stat(__dirname + '/styles/' + file, (err, fileStats) => {
      if (err) {
        console.log(err);
      } else {
        if (fileStats.isFile() && path.extname(file).split(".")[1] == 'css') {
          fs.readFile(__dirname + '/styles/' + file, function (err, data) {
            if (err) throw err;

            fs.appendFile(__dirname + '/project-dist/bundle.css', data, function (err) {
              if (err) throw err;
            }
            );
          });

        }
      }
    });
  });

});