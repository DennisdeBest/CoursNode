const router = require('express').Router()
const db = require('sqlite')
const cookieParser = require('cookie-parser')

const User = require('../models/user.js')
const Session = require('../models/session')

router.get("/",(req,res) => {
	res.render("login/index");
})
router.post("/", (req, res) => {
	User.getByEmail(req).then((user) => {
		Session.insert(user.rowid).then(() => {
			res.cookie('login', 'OK', { maxAge: 900000, httpOnly: true });
			res.redirect("/users");
		})
	}).catch((e) => {
		console.log(e);
	})
})
module.exports = router