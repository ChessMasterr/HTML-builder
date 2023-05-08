const fs = require('fs');
const path = require('path');

const bundle = path.join(__dirname, 'project-dist', 'bundle.css');

const result = fs.createWriteStream(bundle);

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => { // читаем папку и создаем массив
  if (err) throw err
  // console.log(data)
  files.forEach((file) => { // проходимся циклом по массиву
    // console.log(file)

    const filePath = path.join(__dirname, 'styles', file.name.toString()) // важно: путь к КАЖДОМУ файлу
      if(file.isFile()){ // проверка на файл
        const typeFile = file.name.toString().split('.')[1]  // обрезаем имя файла для дальнейшего сравнения
        // console.log(typeFile)
        if(typeFile === 'css') {
          const fileName = file.name.toString()
          fs.readFile(path.join(__dirname, 'styles', fileName), 'utf-8', (err, data) => {  // читаем содержимое файла и пушим в массив
            if (err) throw err;
            const arr = []
            arr.push(data.toString())
        // console.log(arr)
            for(let i = 0; i < arr.length; i += 1) {  // перебераем массив и записываем в результат
              result.write(arr[i])
            }
          })
         

        }
      }
    
  })
})