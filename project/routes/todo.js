const router = require('express').Router()
const Todo = require('../models/todo.js')
const Team = require('../models/team.js')

router.get('/add', (req, res) => {
  Team.getAll().then((teams) => {
    res.format({
      html: () => {res.render("todo/edit", {teams:teams})},
      json: () => {
        res.status(401);
        res.send("Bad request");
      }
    });
  })

})

router.post('/', function(req, res) {
  //get user id from cookie
  var id = req.cookies.AccessToken.id;
  if (req.body.message != '') {
    Todo.insert(req, id).then(() => {
     res.format({
      html: function(){
        res.redirect("/todo")
      }, 
      json: function() {
        res.send(todo);
      }
    });
   })
  }
})

router.get('/', (req, res, next) => {
  var id = req.cookies.AccessToken.id;
  Todo.getAllForUser(id).then((todos) => {
    res.format({
      html: function(){
        res.render("todo/index", {todos: todos});
      }, 
      json: function() {
        res.send(todo);
      }
    });
  }).catch(next)
})

router.delete('/:todoid', (req, res) => {
  Todo.delete(req.params.todoid).then(() => {
    res.format({
      html: () => {
        res.redirect("/todo")
      }, 
      json: () => {
        var response = JSON.stringify({
          'code': 200,
          'message': "todo deleted",});
        res.send(response);
      }
    });
  }).catch((err) => {
    res.status(500).end();
  });
})

router.get("/:todoid/edit", (req, res) => {
  Todo.getById(req.params.todoid).then((todo) => {
    Team.getAll().then((teams) => {
      res.format({
        html: () => {res.render("todo/edit", {todo:todo, teams:teams})},
        json: () => {res.send(todo)}
      });
    }).catch((err) => {
      res.status(500).end();
    });
  })
})

  router.put('/:todoid', (req, res) => {
    Todo.update(req, req.body.todoid).then(() => {
      res.format({
        html: () => {
          res.redirect("/todo")
        }, 
        json: () => {
          var response = JSON.stringify({
            'code': 200,
            'message': "todo updated",});
          res.send(response);
        }
      });
    }).catch((err) => {
      res.status(500).end();
    });
  });

  module.exports = router

