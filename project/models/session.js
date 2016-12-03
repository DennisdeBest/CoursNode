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
	console.log("redis insert");
	return new Promise((resolve, reject) => {
		var date =  new Date();
		var token = "";
		let pipeline = redis.pipeline();
		generateToken().then((token) => {
			console.log("id "+id+" token "+token);
			redis.set(id, token).then(() => {
				resolve({id:id, token:token})
			})
		})
	})
}
Session.getToken = function(id){
	return new Promise((resolve, reject) => {
		resolve(redis.get(id));
	})
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