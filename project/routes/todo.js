const router = require('express').Router()
const db = require('sqlite')

router.get('/', function(req, res, next) {
  res.render('todo/index')
})


module.exports = router

