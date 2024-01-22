const fs = require('fs');
const path = require('path');

// list all files in the directory
fs.readdir(__dirname + '/secret-folder', (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach(file => {
    let size = [];
    fs.stat(__dirname + '/secret-folder/' + file, (err, fileStats) => {
      if (err) {
        console.log(err);
      } else {
        if (fileStats.isFile()) {
          let filename = file.split(".")[0];
          let fileExtension = path.extname(file).split(".")[1];
          console.log(filename + " - " + fileExtension + " - " + fileStats.size);
        }
      }
    });
  });
});