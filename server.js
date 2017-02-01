var express = require('express')
var logger = require('morgan')
const path = require('path')
const nib = require('nib')
const stylus = require('stylus')
var app = express()

const compile = (str, path) => {
  return stylus(str).set('filename', path).use(nib())
}

app.set('views', 'src/views')
app.set('view engine', 'pug')

app.use(
  stylus.middleware({
    src: path.join(__dirname, '/styles'),
    dest: path.join(__dirname, '/static'),
    compile: compile
  })
)

app.use(logger('dev'))
app.use('/assets/', express.static(path.resolve(__dirname, 'src')))
app.use(express.static('build'))

app.get('/', function (req, res, next) {
  try {
    res.render('index')
  } catch (e) {
    next(e)
  }
})

app.get('/lettercount', function (req, res, next) {
  try {
    res.render('lettercount')
  } catch (e) {
    next(e)
  }
})

app.listen(3000, function () {
  console.log('node server running on port 3000')
})
