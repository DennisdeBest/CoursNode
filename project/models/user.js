const db = require('sqlite')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({  
	name: String,
	email: String,
	password: String,
	createdAt: Date,
	updatedAt: Date
})

var User = mongoose.model('User', userSchema)

User.update = function(req) {
	return new Promise((resolve, reject) => {
		var date =  new Date();
		User = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			createdAt: date
		})
		User.save(function(err){
			if(err){
				reject(err);
			}
			resolve(true);
		})
	}) 
}

User.insert = function(req) {
	return new Promise((resolve, reject) => {
		var date =  new Date();
		User = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			createdAt: date
		})
		User.save(function(err){
			if(err){
				reject(err);
			}
			resolve(true);
		})
	}) 
}
User.getAll = function(){
	return new Promise((resolve, reject) => {
		User.find({}, function(err, users) {
			if (err){
				reject(err);
			}
		console.log(users); 
  		resolve(users);
		});
	});
}
User.delete = function(req) {

	return db.run("DELETE FROM users WHERE rowid = ?",req.params.userid)
}

User.getById = function(req) {
	return db.get("SELECT rowid, * FROM users WHERE rowid = ?", req.params.userid)
}
User.getByName = function(req) {
	return new Promise((resolve, reject) => {
		db.get("SELECT rowid, * FROM users WHERE name = ?", req.body.name).then((user) => { 
			if(user){
				resolve(user);
			}
			else {
				resolve(false);
			}
		}).catch((e) => {
			reject(e);
		})

	})

}
User.getByEmail = function(req) {
	return new Promise((resolve, reject) => {
		db.get("SELECT rowid, * FROM users WHERE email = ?", req.body.email).then((user) => { 
			if(user){
				resolve(user);
			}
			else {
				resolve(false);
			}
		}).catch((e) => {
			reject(e);
		})

	})

}



module.exports = User;