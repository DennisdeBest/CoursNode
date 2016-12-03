const router = require('express').Router()
const Todo = require('../models/todo.js')

router.get('/add', (req, res) => {
  res.format({
    html: () => {res.render("todo/new")},
    json: () => {
      res.status(401);
      res.send("Bad request");
    }
  });
})

router.post('/', function(req, res) {
  //get user id from cookie
    var id = req.cookies.AccessToken.id;
    console.log(req.cookies.AccessToken)
    if (req.body.message != '') {
        Todo.insert(req, id).then(() => {
        	res.format({
		      html: function(){
		        res.redirect("/todo")
		      }, 
		      json: function() {
		        res.send(todo);
		        console.log("json");
		      }
		    });
 		})
    }
})

router.get('/', (req, res, next) => {
 Todo.getAll(req).then((todos) => {
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

router.delete('/:userid', (req, res) => {
  Todo.delete(req).then(() => {
    res.format({
      html: function(){
        res.redirect("todo/index")
      }, 
      json: function() {
        var response = JSON.stringify({
          'code': 200,
          'message': "todo deleted",});
        res.send(response);
      }
    });
  }).catch((err) => {
    res.status(500).end();
    console.log(err);
  });
})

router.get("/:todoid/edit", (req, res) => {
  console.log(req.params)
  Todo.getById(req.params.todoid).then((todo) => {
    console.log(todo);
    res.format({
      html: function(){
        res.render("todo/edit", {todo: todo});
      }, 
      json: function() {
        res.send(todo);
      }
    });
  }).catch((err) => {
    res.status(500).end();
    console.log(err);
  });
})

router.put('/:userid', (req, res) => {
  Todo.update(req).then(() => {
    res.format({
      html: function(){
        res.redirect("/todo")
      }, 
      json: function() {
        var response = JSON.stringify({
          'code': 200,
          'message': "todo updated",});
        res.send(response);
      }
    });
  }).catch((err) => {
    res.status(500).end();
    console.log(err);
  });
});

module.exports = router

