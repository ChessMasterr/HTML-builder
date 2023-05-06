const fs = require('fs')
const path = require('path')

fs.readdir(path.join(__dirname, 'secret-folder'), (err, data) => { // читаем папку и создаем массив
  if (err) throw err
  // console.log(data)
  data.forEach((file) => { // проходимся циклом по массиву
    const filePath = path.join(__dirname, 'secret-folder', file) // важно: путь к КАЖДОМУ файлу 
    fs.stat(filePath, (err, stats) => {

      if (err) throw err
      if(stats.isFile()){
        console.log(path.parse(file).name + ' \t ' + path.extname(file).slice(1) + ' \t ' + stats.size  + 'B') // первое чисто имя, второе расширение (слик чтобы убрать точку), третье размер в битах
      }
    })
    
  })
})