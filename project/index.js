const db = require('sqlite')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 8080;
const API = require('json-api');
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

db.open('expressapi.db').then(() => {
	return db.run('CREATE TABLE IF NOT EXISTS users (name, email, createdAt, updatedAt)')
}).then(() => {
	console.log('> Database ready')
	}).catch((err) => { // Si on a eu des erreurs
		console.error('ERR> ', err)
	})

	app.all('/', (req, res) => {
		res.send('User api')
	})

	app.post('/users', (req, res) => {
		var date =  new Date();
		db.run("INSERT INTO users VALUES (?,?, ?, ?)", req.body.name, req.body.email, date, null).then(() => {
			console.log("user "+req.body.name+" inserted");
		})
		console.log(req.body)
	})
	app.get('/users', (req, res) => {

		if(req.query.limit && req.query.offset)
		{
			db.each("SELECT rowid, * FROM users LIMIT ? OFFSET ?",req.query.limit, req.query.offset, function(err, row){
				res.write(row.rowid + " - " + row.name + " - " + row.email+ "\n")
			}).then(() => {
				res.end();
			});
		}
		else {
			db.each("SELECT rowid, * FROM users", function(err, row){
				res.write(row.rowid + " - " + row.name + " - " + row.email+ "\n")
			}).then(() => {
				res.end();
			});
		}

	});
	app.get('/users/:userid', (req, res) => {
		db.get("SELECT rowid, * FROM users WHERE rowid = ?", req.params.userid).then((user) => {
			res.send(user)
		}).catch((err) => {
			res.status(500).end();
			console.log(err);
		});
	})
	app.put('/users/:userid', (req, res) => {
		var date =  new Date();

		db.run("UPDATE users SET name = ?, email = ?, updatedAt= ? WHERE rowid = ?",req.body.name, req.body.email, date, req.params.userid).then(() => {
			var response = JSON.stringify({
				'code': 200,
				'message': "user updated",
			})	
			console.log(response);
		}).catch((err) => {
			res.status(500).end();
			console.log(err);
		});
	});
	app.delete('/users/:userid', (req, res) => {
		console.log(req.params)
		db.run("DELETE FROM users WHERE rowid = ?",req.params.userid )
	});
	app.listen(port, () => {
		console.log("Server listening on port : "+ port)
	})