const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'),
  { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Directory created successfully!');
  });

fs.readdir(__dirname + '/files', (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach(file => {
    fs.stat(__dirname + '/files/' + file, (err, fileStats) => {
      if (err) {
        console.log(err);
      } else {
        if (fileStats.isFile()) {
          fs.copyFile(__dirname + '/files/' + file, __dirname + '/files-copy/' + file, (err) => {
            if (err) {
              console.log("Error Found:", err);
            }
          });
        }
      }
    });
  });
});
