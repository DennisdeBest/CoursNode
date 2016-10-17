const router = require('express').Router()
const db = require('sqlite')

db.open('expressapi.db').then(() => {
  return db.run('CREATE TABLE IF NOT EXISTS users (name, email, createdAt, updatedAt)')
}).then(() => {
  console.log('> Database ready')
  }).catch((err) => { // Si on a eu des erreurs
    console.error('ERR> ', err)
  })


/* Users : liste */
router.post('/', (req, res) => {
  var date =  new Date();
  db.run("INSERT INTO users VALUES (?,?, ?, ?)", req.body.name, req.body.email, date, null).then(() => {
    console.log("user "+req.body.name+" inserted");
  })
  console.log(req.body)
})
router.get('/', (req, res) => {

  if(req.query.limit && req.query.offset)
  {
    db.each("SELECT rowid, * FROM users LIMIT ? OFFSET ?",req.query.limit, req.query.offset, function(err, row){
      res.write(row.rowid + " - " + row.name + " - " + row.email+ "\n")
    }).then(() => {
      res.end();
    });
  }
  else {
    db.all("SELECT rowid, * FROM users").then((users) => {
      res.render('users/index', {users: users})
    }).catch((err) => {
      res.status(500).end();
      console.log(err);
    })
  }

});
router.get('/add', (req, res) => {

  console.log("add");
  res.render("users/edit");
})
router.post('/add', (req, res) => {
  var date =  new Date();
  db.run("INSERT INTO users VALUES (?,?, ?, ?)", req.body.name, req.body.email, date, null).then(() => {
    res.format({
      html: function(){
        res.redirect("/users")
      }, 
      json: function() {
        res.send(user);
        console.log("json");
      }
    });
  })
  console.log(req.body)
})
router.get('/:userid', (req, res) => {
  db.get("SELECT rowid, * FROM users WHERE rowid = ?", req.params.userid).then((user) => {
    res.format({
      html: function(){
        res.render("users/show", {user: user});
      }, 
      json: function() {
        res.send(user);
      }
    });
  }).catch((err) => {
    res.status(500).end();
    console.log(err);
  });
})

router.get("/:userid/edit", (req, res) => {
  db.get("SELECT rowid, * FROM users WHERE rowid = ?", req.params.userid).then((user) => {
    res.format({
      html: function(){
        res.render("users/edit", {user: user});
      }, 
      json: function() {
        res.send(user);
      }
    });
  }).catch((err) => {
    res.status(500).end();
    console.log(err);
  });
})

router.put('/:userid', (req, res) => {
  var date =  new Date();

  db.run("UPDATE users SET name = ?, email = ?, updatedAt= ? WHERE rowid = ?",req.body.name, req.body.email, date, req.params.userid).then(() => {
    res.format({
      html: function(){
        res.redirect("/users")
      }, 
      json: function() {
        var response = JSON.stringify({
          'code': 200,
          'message': "user updated",});
        res.send(response);
      }
    });
  }).catch((err) => {
    res.status(500).end();
    console.log(err);
  });
});
router.delete('/:userid', (req, res) => {
  db.run("DELETE FROM users WHERE rowid = ?",req.params.userid ).then(() => {
    res.format({
      html: function(){
        res.redirect("/users")
      }, 
      json: function() {
        var response = JSON.stringify({
          'code': 200,
          'message': "user deleted",});
        res.send(response);
      }
    });
  }).catch((err) => {
    res.status(500).end();
    console.log(err);
  });
});

module.exports = router
