const fs = require('fs');
const path = require('path');

// можно и через константу путь указать const way = path.join(__dirname, 'text.txt')
const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8')

readStream.on('data', (chunk) => {
        console.log(chunk);  // chunk.toString() eсли не прописывать utf-8
    });