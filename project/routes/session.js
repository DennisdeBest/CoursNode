const router = require('express').Router()
const db = require('sqlite')
const cookieParser = require('cookie-parser')

const User = require('../models/user.js')
const Session = require('../models/session.js')

router.get("/",(req,res) => {
	res.render("login/index");
})

router.post("/", (req, res, next) => {
	if(req.body.login){
		User.getByEmail(req).then((user) => {
			if(user.length > 0 && req.body.password == user[0].password){
				Session.insert(user[0]._id).then((info) => {
					//Set cookie to 30 minutes
					res.cookie("AccessToken", {id:info.id, token:info.token}, { maxAge: 1800000, httpOnly: true });
					res.redirect("/users");
				})
			}
			else {
				res.render("login/index", {err:"Login incorrect"})
			}
		}).catch((e) => {
			console.log(e);
		})
	}else {
		next();
	}
})

router.get("/logout", (req, res, next) => {
	if(req.cookies.AccessToken){
		//Timeout cookie
		res.cookie("AccessToken", {}, { maxAge: 0, httpOnly: true });
		res.render("login/index", {err:"Logout succesful"})		
	} else {
		res.render("login/index", {err:"No active session"})	
	}
})

module.exports = router