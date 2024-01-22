const fs = require('fs');
const writableStream = fs.createWriteStream(__dirname + '/text.txt');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Write something about you: '
});

writableStream.on('error', (error) => {
  console.log(`An error occured while writing to the file. Error: ${error.message}`);
});

readline.prompt();

readline.on('line', (line) => {
  readline.on('SIGINT', () => {
    //console.log("Okay, bye!");
    readline.close();
  });

  switch (line.trim()) {
    case 'exit':
      readline.close();
      break;
    default:
      sentence = line + '\n';
      writableStream.write(sentence);
      readline.prompt();
      break;
  }
}).on('close', () => {
  writableStream.end();
  console.log('Have a great day!');
  process.exit(0);
});
