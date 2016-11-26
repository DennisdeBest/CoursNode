const db = require('sqlite')
const crypto = require('crypto')
const Redis = require('ioredis')
const redis = new Redis()

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
		let pipeline = redis.pipeline();
		generateToken().then((token) => {
			return redis.set(id, token)
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