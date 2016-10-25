const router = require('express').Router()
const db = require('sqlite')
const cookieParser = require('cookie-parser')

const User = require('../models/user.js')
const Session = require('../models/session')

router.get("/",(req,res) => {
	res.render("login/index");
})
router.post("/", (req, res) => {
	console.log(req.body);
	if(req.body.login){
			User.getByEmail(req).then((user) => {
				console.log(user);
		if(req.body.password == user.password){
			console.log(req.body.password)
			Session.insert(user.rowid).then((token) => {
				res.cookie("session", token, { maxAge: 900000, httpOnly: true });
				res.redirect("/users");
			})
		} else {
			res.redirect("/users");
		}

	}).catch((e) => {
		console.log(e);
	})
} else {
	res.redirect("/users/add");
}

})
module.exports = router