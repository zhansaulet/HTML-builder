const { ENOENT } = require('constants');
const fs = require('fs');

let filename = __dirname + '/text.txt';
let readStream = fs.ReadStream(filename, { encoding: 'utf-8' });

readStream.on('readable', function () {
  let data = readStream.read();

  if (data != null) {
    console.log(data);
  }

});

readStream.on('end', function () {
  //console.log("");
});

readStream.on('error', function (err) {
  if (err.code == ENOENT) {
    console.log("Файл не найден");
  } else {
    console.error(err);
  }

});