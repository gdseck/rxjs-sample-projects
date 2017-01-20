var express = require('express')
var logger = require('morgan')
const path = require('path')
const pug = require('pug')
const nib = require('nib')
const stylus = require('stylus')
var app = express()

const compile = (str, path) => {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

// var template = require('jade').compileFile(__dirname + '/index.jade')
app.set('views', './views')
app.set('view engine', 'pug')

app.use(stylus.middleware({
  src: path.join(__dirname, '/styles'),
  dest: path.join(__dirname, '/static'),
  compile: compile
}))

app.use(logger('dev'))
app.use(express.static(__dirname + '/styles'))
app.use(express.static(__dirname + '/js'))

app.get('/', function (req, res, next) {
  try {
    res.render('index')
  } catch (e) {
    next(e)
  }
})

app.get('/')

app.listen(3000, function () {
  console.log('node server running on port 3000')
})
