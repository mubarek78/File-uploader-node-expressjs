const express = require('express');
const upload = require('express-fileUpload');
const ejs = require('ejs')

var app = express();
app.use(upload());
app.set('view engine', 'ejs')
// Public Folder
app.use(express.static('./public'));

app.get('/', function(req, res){
  var file = ''
  res.render('index', {files: file})
})

app.post('/', function(req, res){

  if(req.files){
    var file = req.files.file
    var filename = file.name
    console.log(typeof req.files.file)
    file.mv('public/uploads/' + filename, function(err){
      if(err){
        res.render('index', {
          msg: err
        });
      }if(req.files.file == undefined){
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
      }else{
        res.render('index', {msg: 'File Uploaded!', files: filename})
      }


    })
  }
})







app.listen('3000', function () {
    console.log('port 3000 working')
})
