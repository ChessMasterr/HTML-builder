const fs = require('fs')
const path =  require('path')
const { stdout, stdin, exit } = require('process');

const newFile = path.join(__dirname, 'text.txt');
const writingTotext = fs.createWriteStream(newFile)
stdout.write(' Napishi chto nibyd... \n')

function out() {
  stdout.write('\n Good bye \n')
  exit();
}

stdin.on('data', data => {
  if(data.toString().trim() === 'exit') { // если введен exit
    out()
  }
  writingTotext.write(data)
})

process.on('SIGINT', out) // слушает и добавляет перед выходом