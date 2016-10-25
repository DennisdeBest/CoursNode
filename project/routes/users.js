const router = require('express').Router()
const db = require('sqlite')
const User = require('../models/user.js')


/* Users : liste */
router.post('/', (req, res) => {
  User.insert(req).then(() => {
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
  res.format({
    html: () => {res.render("users/edit")},
    json: () => {
      res.status(401);
      res.send("Bad request");
    }
  });
})
router.post('/add', (req, res) => {
  User.insert(req).then(() => {
    res.format({
      html: function(){
        res.redirect("/users")
      }, 
      json: function() {
        res.send(user);
      }
    });
  })
  console.log(req.body)
})
router.post('/:userid/promote', (req, res) => {
  User.promote(req).then(() => {
    res.format({
      html: function(){
        res.redirect("/users")
      }, 
      json: function() {
        res.send(user);
      }
    });
  })
  console.log(req.body)
})
router.get('/:userid', (req, res) => {
 User.getById(req).then((user) => {
  if(!user) return next();
  
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
  User.getById(req).then((user) => {
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
  User.update(req).then(() => {
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
  User.delete.then(() => {
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
