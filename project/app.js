const db = require('sqlite')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 8080;
const connect        = require('connect')
const methodOverride = require('method-override')
const path = require('path')
const sass = require('node-sass-middleware')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Todo');



db.open('expressapi.db').then(() => {
  Promise.all([
    db.run('CREATE TABLE IF NOT EXISTS users (name, email, password, role, createdAt, updatedAt)'),
    db.run('CREATE TABLE IF NOT EXISTS sessions (userId, accessToken, createdAt, expiresAt)')
    ]).then(() => {
      console.log('> Database ready')
  }).catch((err) => { // Si on a eu des erreurs
    console.error('ERR> ', err)
  })
});

app.use(cookieParser())

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


app.set('views', __dirname + '/views');
app.set('view engine', 'twig');

app.use(sass({
  src: path.join(__dirname, 'styles'),
  dest: path.join(__dirname, 'assets', 'css'),
  prefix: '/css',
  outputStyle: 'expanded'
}))

// This section is optional and can be used to configure twig.
app.set('twig options', { 
	strict_variables: false
});

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

// On sert les fichiers statiques
app.use(express.static(path.join(__dirname, 'assets')))
app.use('/jquery', express.static(path.join(__dirname,'node_modules/jquery/dist')));
app.use('/jquery_awesome_cursor', express.static(path.join(__dirname,'node_modules/jquery-awesome-cursor/dist')));

//Auth middleware
/*
app.use(function(req, res, next) {
  if(req.url == "/users/add"){
    next();
  }
  else if(req.url != "/session"){
    if(req.cookies.login != "OK"){
		res.redirect("/session")
	}
	else {
		next();
	}
} else {
  next();
}
})
*/
// La liste des différents routeurs (dans l'ordre)
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/todo', require('./routes/todo'))
app.use('/session', require('./routes/session'))

// Erreur 404
app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Gestion des erreurs
// Notez les 4 arguments !!
app.use(function(err, req, res, next) {
  // Les données de l'erreur
  let data = {
    message: err.message,
    status: err.status || 500
  }

  // En mode développement, on peut afficher les détails de l'erreur
  if (app.get('env') === 'development') {
    data.error = err.stack
  }

  // On set le status de la réponse
  res.status(data.status)

  // Réponse multi-format
  res.format({
    html: () => { res.render('error', data) },
    json: () => { res.send(data) }
  })
})

app.listen(port, () => {
  console.log("Server listening on port : "+ port)
})