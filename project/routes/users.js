const router = require('express').Router()
const User = require('../models/user.js')


router.get('/', (req, res) => {
  User.getAll().then((users)=> {
    res.render("users/index", {users: users});
  });
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
router.post('/', (req, res) => {
  User.insert(req).then(() => {
    res.format({
      html: function(){
        res.redirect("/todo")
      }, 
      json: function() {
        res.send(user);
      }
    });
  })
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
})

router.get('/:userid', (req, res) => {
 User.getById(req).then((user) => {
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
  });
})

router.get("/:userid/edit", (req, res) => {
  User.getById(req.params.userid).then((user) => {
    res.format({
      html: function(){
        res.render("users/edit", {user: user[0]});
      }, 
      json: function() {
        res.send(user);
      }
    });
  }).catch((err) => {
    res.status(500).end();
  });
})

router.put('/:userid', (req, res) => {
  User.update(req, req.body.userid).then(() => {
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
  });
});
router.delete('/:userid', (req, res) => {
  User.delete(req.params.userid).then(() => {
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
  });
});

module.exports = router
