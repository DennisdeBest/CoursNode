const router = require('express').Router()

/* Twig main template */
router.get('/', function(req, res, next) {
  res.render('index')
})

module.exports = router
