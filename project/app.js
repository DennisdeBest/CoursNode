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
const Session = require('./models/session.js')
mongoose.connect('mongodb://localhost:27017/Todo');

app.use(cookieParser())

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


app.set('views', __dirname + '/views');
app.set('view engine', 'twig');

//Set the Sass folders
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

// Static files
app.use(express.static(path.join(__dirname, 'assets')))
app.use('/jquery', express.static(path.join(__dirname,'node_modules/jquery/dist')));
app.use('/jquery_awesome_cursor', express.static(path.join(__dirname,'node_modules/jquery-awesome-cursor/dist')));

//Auth middleware
app.use(function(req, res, next) {
  if(req.cookies.AccessToken){
    Session.getToken(req.cookies.AccessToken.id).then((token) => {
     if(req.cookies.AccessToken.token == token){
      next();
    }
  })
  } 
    //Whitelist some URLs
    else if(req.url == "/users/add" || req.url == "/session" || req.url == "/session/logout"){
      next();
    }
  //Redirect to login page
  else {
    res.redirect("/session");  
  }
  
})

// Routers
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/todo', require('./routes/todo'))
app.use('/teams', require('./routes/team'))
app.use('/session', require('./routes/session'))

// 404
app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error Handling
app.use(function(err, req, res, next) {
  // Error data
  let data = {
    message: err.message,
    status: err.status || 500
  }

  // Display error stack in dev env
  if (app.get('env') === 'development') {
    data.error = err.stack
  }

  // Serve error response code
  res.status(data.status)

  // Multi-format
  res.format({
    html: () => { res.render('error', data) },
    json: () => { res.send(data) }
  })
})

app.listen(port, () => {
  console.log("Server listening on port : "+ port)
})