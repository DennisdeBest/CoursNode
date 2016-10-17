const db = require('sqlite')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 8080;
const API = require('json-api');
const connect        = require('connect')
const methodOverride = require('method-override')
const path = require('path')

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


app.set('views', __dirname + '/views');
app.set('view engine', 'twig');

// This section is optional and can be used to configure twig.
app.set('twig options', { 
	strict_variables: false
});

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

// On sert les fichiers statiques
app.use(express.static(path.join(__dirname, 'assets')))

// La liste des différents routeurs (dans l'ordre)
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

db.open('expressapi.db').then(() => {
	return db.run('CREATE TABLE IF NOT EXISTS users (name, email, createdAt, updatedAt)')
}).then(() => {
	console.log('> Database ready')
	}).catch((err) => { // Si on a eu des erreurs
		console.error('ERR> ', err)
	})

	
	app.listen(port, () => {
		console.log("Server listening on port : "+ port)
	})