const router = require('express').Router()
const db = require('sqlite')

const User = require('../models/user.js')
const Session = require('../models/session')

router.get("/",(req,res) => {
	res.render("login/index");
})
router.post("/", (req, res) => {
	User.getByEmail(req).then((user) => {
		Session.insert(user.rowid).then(() => {
			res.redirect("/users");
			//TODO set cookie
		})
	}).catch((e) => {
		console.log(e);
	})
})
module.exports = router