const fs = require('fs')
const path = require('path')

fs.rm(path.join(__dirname, 'files-copy'), { recursive: true, force:true }, (err) => { // удаляем папку recursive: true  выполняет рекурсивное удаление(по умолчанию false) force:true При значении true исключения будут игнорироваться
  if (err) throw err;
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => { // создаем папку recursive: true исключает ошибку если уже создан
  if (err) throw err;})
  fs.readdir(path.join(__dirname, 'files'), (err, files) => { // читаем папку и создаем массив
  if (err) throw err
  files.forEach(el => { // проходимся по массиву и копируем файлы
    fs.copyFile(path.join(__dirname, 'files', el), path.join(__dirname, 'files-copy', el), (err) => { // от куда и куда)
      if (err) throw err;
    })
  })
})

})

