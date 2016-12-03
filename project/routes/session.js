const router = require('express').Router()
const db = require('sqlite')
const cookieParser = require('cookie-parser')

const User = require('../models/user.js')
const Session = require('../models/session.js')
const Logger = require('../models/logger.js')

router.get("/",(req,res) => {
	//Logger.info("something");
	res.render("login/index");
})

router.post("/", (req, res, next) => {
	if(req.body.login){
		User.getByEmail(req).then((user) => {
			if(req.body.password == user[0].password){
				console.log("password correct");
				Session.insert(user[0]._id).then((info) => {
					res.cookie("AccessToken", {id:info.id, token:info.token}, { maxAge: 900000, httpOnly: true });
					res.redirect("/users");
				})
			}
		}).catch((e) => {
			console.log(e);
		})
	}else {
		next();
	}
})
module.exports = router