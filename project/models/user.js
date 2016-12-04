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

User.update = function(req, id) {
	return new Promise((resolve, reject) => {
		console.log("UPDATE");
		console.log(id)
		User.findById(id, function(err, user){
			if(err){
				reject(err);
			}
			console.log(user);
			var date =  new Date();
			user.name = req.body.name;
			user.email = req.body.email;
			user.password = req.body.password;
			user.updatedAt = date;

			user.save(function(err){
			if(err){
				reject(err);
			} else {
			resolve(true);
			}
		})		
	}) 
})
}

User.insert = function(req) {
	return new Promise((resolve, reject) => {
		var date =  new Date();
		user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			createdAt: date
		})
		user.save(function(err){
			if(err){
				reject(err);
			}
			resolve(true);
		})
	}) 
}
User.getAll = function(){
	return new Promise((resolve, reject) => {
		console.log("USERS get aLL");
		User.find({}, function(err, users) {
			console.log(err);
			console.log(users);
			if (err){
				reject(err);
			} 
  		resolve(users);
		});
	});
}
User.delete = function(id) {
	console.log("User id" + id);
	return new Promise((resolve, reject) => {
		User.findOneAndRemove({_id:id}, function (err) {
			if(err){
				reject(err);
			}
			console.log('User deleted!');
			resolve(true);
		})
	})
}

User.getById = function(id) {
return new Promise((resolve, reject) => {
		User.find({_id:id}, function(err, user){
			if(err) {
				reject(err);
			}
			resolve(user);
		})
	})
}
User.getByName = function(req) {
return new Promise((resolve, reject) => {
		User.find({name:req.body.name}, function(err, user){
			if(err) {
				reject(err);
			}
			console.log(user);
			resolve(user);
		})
	})

}
User.getByEmail = function(req) {
	return new Promise((resolve, reject) => {
		console.log("Get by email");
		User.find({email:req.body.email}, function(err, user){
			if(err) {
				reject(err);
			}
			console.log(user);
			resolve(user);
		})
	})

}



module.exports = User;