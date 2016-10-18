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
	return db.run("UPDATE users SET name = ?, email = ?, password = ?, updatedAt= ? WHERE rowid = ?",req.body.name, req.body.email, req.body.password, date, req.params.userid);
}

User.insert = function(req) {
	  var date =  new Date();
	return db.run("INSERT INTO users VALUES (?,?, ?, ?, ?)", req.body.name, req.body.email, req.body.password, date, null);
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