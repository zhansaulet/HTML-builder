const fs = require('fs');
const path = require('path');
let writableStream = fs.createWriteStream(__dirname + '/project-dist/style.css');

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

// copy function to copy assets folder to /project-dist/assets folder
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


// combine all styles to style.css file
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

            fs.appendFile(__dirname + '/project-dist/style.css', data, function (err) {
              if (err) throw err;
            }
            );
          });

        }
      }
    });
  });

});


// create index.html file
// writableStream = fs.createWriteStream(__dirname + '/project-dist/index.html');

// copy template.html content -> index.html
fs.copyFile(__dirname + '/template.html', __dirname + '/project-dist/index.html', (error) => {
  // incase of any error
  if (error) {
    console.error(error);
    return;
  }

  // console.log("Copied Successfully!");
});