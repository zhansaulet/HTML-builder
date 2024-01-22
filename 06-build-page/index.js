const fs = require('fs');
const path = require('path');

// create a project-dist folder
fs.mkdir(path.join(__dirname, 'project-dist'),
  { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
  });

// create an assets folder
fs.mkdir(path.join(__dirname + '/project-dist', 'assets'),
  { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
  });

const src = __dirname + '/assets';
const dest = __dirname + '/project-dist/assets';

// copy function 
const copy = (src, dest) => {
  fs.readdir(src, (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach(file => {
      if (err) {
        console.log(err);
      } else {
          fs.stat(src + '/' + file, (err, fileStats) => {
            if (err) {
              console.log(err);
            } else {
              if (fileStats.isFile()) {
                fs.copyFile(src + '/' + file, dest + '/' + file, (err) => {
                  if (err) {
                    console.log("Error Found:", err);
                  }
                });
              } else if (fileStats.isDirectory()){
                fs.mkdir(path.join(dest, file), 
                { recursive: true }, (err) => {
                  if (err) {
                    return console.error(err);
                  }
                });
                copy(src+'/'+file, dest+'/'+file);
              }
            }
          });
      }
  });
});
};

copy(src, dest);