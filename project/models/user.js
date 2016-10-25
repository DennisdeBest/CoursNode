const db = require('sqlite')

var User = function () {  
    this.name = "";
    this.email = "";
    this.password = "";
    this.createdAt = "";
    this.updatedAt = "";
}

User.update = function(req) {
	  var date =  new Date();
	  var role = "user";
	  if(req.body.role){
	  	role = req.body.role;
	  }
	return db.run("UPDATE users SET name = ?, email = ?, password = ?, role = ?, updatedAt= ? WHERE rowid = ?",req.body.name, req.body.email, req.body.password, role, date, req.params.userid);
}

User.promote = function(req) {
	  if(req.body.role){
	  	return db.run("UPDATE users SET role = ? WHERE rowid = ?",req.body.role, req.params.userid);
	  } else {
	  	return false;
	  }
}

User.insert = function(req) {
	  var date =  new Date();
	  var role = "user";
	return db.run("INSERT INTO users VALUES (?,?, ?, ?, ?, ?)", req.body.name, req.body.email, req.body.password, role, date, null);
}
User.delete = function(req) {
	return db.run("DELETE FROM users WHERE rowid = ?",req.params.userid)
}

User.getById = function(id) {
	return db.get("SELECT rowid, * FROM users WHERE rowid = ?", id)
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