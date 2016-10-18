const db = require('sqlite')
const crypto = require('crypto')

var Session = function () {  
	this.userId = "";
	this.accessToken = "";
	this.createdAt = "";
	this.expiresAt = "";
}

Session.insert = function(id){
	return new Promise((resolve, reject) => {
		var date =  new Date();
		var token = "";
		
		generateToken().then((token) => {
			resolve(db.run("INSERT INTO sessions VALUES (?,?, ?, ?)", id, token, date, date));
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