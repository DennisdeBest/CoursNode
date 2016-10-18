const router = require('express').Router()
const db = require('sqlite')

router.get('/', function(req, res, next) {
  res.render('index')
})


module.exports = router

