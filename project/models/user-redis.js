const db = require('sqlite')
const Redis = require('ioredis')
const redis = new Redis()

let logger = (key) => { return (val) => {
	console.log(`> ${key}: `, val)
	return val
}}

var User = function () {  
	this.name = "";
	this.email = "";
	this.password = "";
	this.createdAt = "";
	this.updatedAt = "";
}

User.update = function(req) {
}

User.promote = function(req) {
}

User.insert = function(req) {
	var date =  new Date();
	let pipeline = redis.pipeline()
	let userId = require('uuid').v4()
	pipeline.hmset(`user:${userId}`, {name:req.body.name, email:req.body.email, password:req.body.password, createdAt:date, updateAt:null})
	pipeline.sadd('users', userId)
	return pipeline.exec()
}
User.delete = function(req) {
}

User.getById = function(id) {
}
User.getByName = function(req) {
}
User.getByEmail = function(req) {
}

User.getAll = function() {

	var usersArray = [];
	return redis.smembers("users").then((users) => {
		let pipeline = redis.pipeline()
		for(let i = 0; i < users.length; i++)
		{
			var userid = "user:"+users[i];
			pipeline.hmget(userid, "name", "email");
		}
		return pipeline.exec()
	}).then((res) => {
		for(let i = 0; i < res.length; i++){
			let user = {
				name : "",
				email : "",
			};
			attributeArray = res[i][1];
			user.name = attributeArray[0];
			user.email = attributeArray[1];
			usersArray.push(user)
		}
		return usersArray;			
	})

}



module.exports = User;