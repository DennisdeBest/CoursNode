const db = require('sqlite')
const crypto = require('crypto')
const User = require('../models/user.js')

var Session = function () {  
	this.userId = "";
	this.accessToken = "";
	this.createdAt = "";
	this.expiresAt = "";
}

Session.insert = function(id){
	return new Promise((resolve, reject) => {
		var date =  new Date()
		var endDate = date.setHours(1);
		var token = "";

		//console.log("Date : " + date + " EndDate : " + endDate);
		
		generateToken().then((token) => {
			var token = token;
			db.run("INSERT INTO sessions VALUES (?,?, ?, ?)", id, token, date, endDate).then(() => {
				resolve(token);
			})
		})
	})
	
}

Session.all = function(){
	return db.all("SELECT * FROM sessions");
}

var generateToken = function() {
	return new Promise((resolve, reject) => {
		crypto.randomBytes(48, function(err, buffer) {
			token = buffer.toString('hex');
			resolve(token)
		})
	})
}

module.exports = Session;