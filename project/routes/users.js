const router = require('express').Router()
const User = require('../models/user.js')


router.get('/', (req, res) => {
  console.log("In the redirect route");
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

router.post('/add', (req, res) => {
  console.log("POST user")
  User.insert(req).then(() => {
    res.format({
      html: function(){
        console.log("ResRedirect")
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
    console.log(err);
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
    console.log(err);
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
    console.log(err);
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
    console.log(err);
  });
});

module.exports = router
