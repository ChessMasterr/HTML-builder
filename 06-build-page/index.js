const fs = require('fs')
const path = require('path')


function copyAssest() {
  fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => { // создаем папку
    if (err) throw err;
  })
  fs.readdir(path.join(__dirname, 'assets'), { withFileTypes: true }, (err, files) => { // читаем папку и создаем массив
    if (err) throw err
    files.forEach(el => { // проходимся по массиву и копируем файлы
      if (el.isDirectory) {
        copyFolder(el.name); // вызываем функцию копирования вложенных папок
      }
      if (el.isFile()) {
        fs.copyFile(path.join(__dirname, 'assets', el), path.join(__dirname, 'project-dist', 'assets', el), (err) => { // от куда и куда)
        if (err) throw err;
      })
      }
    })
  })
}

function copyFolder(nameFolder) { // копировние вложенных папок
  fs.mkdir(path.join(__dirname, 'project-dist', 'assets', nameFolder), { recursive: true }, (error) => { // создаем в ассесте вложенные папки
    // console.log(nameFolder, '1')
      if (error) throw err;
      fs.readdir(path.join(__dirname, './assets', `./${nameFolder}`), { withFileTypes: true }, (error, files) => {
        // console.log(nameFolder, '2')
          if (error) throw err;
          files.forEach(el => { // копируем файлы
            if (el.isFile()) {
              fs.copyFile(path.resolve(__dirname, './assets', `./${nameFolder}`, `${el.name}`), path.join(__dirname, 'project-dist', 'assets', `./${nameFolder}`, `${el.name}`), (error) => {
                  if (error) throw err; 
                  // console.log(nameFolder, '3')
              });
            }
          })
        }
      );
    });
}

function createTemplate() { // создаем  html Template
  fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', function (err, data) { // прочитываем файл
    if (err) throw err;
      
      fs.readdir(path.join(__dirname, './components'), { withFileTypes: true }, (err, files) => { // читаем и создаем массив
          if (err) throw err;

          replaceAttribute(data, files);
        }
      );
    }
  );
}

function replaceAttribute(result, files) {
  const [file, sym] = files;
  // console.log(files, "files" + '\n')
  const [name, ...format] = file.name.split('.');
  // console.log(file.name.split('.'), 'nigniy' + '\n')
  if (file.isFile()) {
    if(format.at(-1) === 'html') {
      fs.readFile(path.join(__dirname, 'components', file.name), 'utf-8', function (err, data) {
        if (err) throw err;
        result = result.replace(`{{${name}}}`, data);

        fs.writeFile(path.join(__dirname, './project-dist', 'index.html'), result, (err) => {
            if (err) throw err;
            if(sym) {
              replaceAttribute(result, files.slice(files.indexOf(file) + 1))
            }
          }
        );
      });
    }
    
  }
}

function createCSS () {
  const bundle = path.join(__dirname, 'project-dist', 'style.css');
  const result = fs.createWriteStream(bundle);

  fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => { // читаем папку и создаем массив
    if (err) throw err
    // console.log(data)
    files.forEach((file) => { // проходимся циклом по массиву
      // console.log(file)
  
     // const filePath = path.join(__dirname, 'styles', file.name.toString())  важно: путь к КАЖДОМУ файлу
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
}

fs.rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true }, (err) => { // удаляем папку. recursive: true  выполняет рекурсивное удаление(по умолчанию false) force:true При значении true исключения будут игнорироваться
  if (err) throw err;
  fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => { // создаем папку. recursive: true исключает ошибку если уже создан
  if (err) throw err;
  copyAssest();
  createCSS();
  createTemplate();
  })
});

