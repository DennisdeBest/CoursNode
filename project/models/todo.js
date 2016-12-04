var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({  
    userId: String,
    message: String,
    team: String,
    priorite: String,
    status: String,
    createdAt: Date,
    updatedAt: Date
})

var Todo = mongoose.model('Todo', todoSchema)

Todo.update = function(req, id) {
    return new Promise((resolve, reject) => {
        Todo.findById(id, function(err, todo){
            if(err){
                reject(err);
            }
            if(req.body.status == 'on' || req.body.status == 1){
                var status = 1;
            }else {
                var status = 0;
            }
            var date =  new Date();
            todo.message = req.body.message;
            todo.team = req.body.team;
            todo.status = status;
            todo.updatedAt = date;
            todo.priorite = req.body.priorite;
            todo.updatedAt = date;

            todo.save(function(err){
                if(err){
                    reject(err);
                } else {
                    resolve(true);
                }
            })      
        }) 
    })
}

Todo.insert = function(req, id) {
    return new Promise((resolve, reject) => {
        var date =  new Date();
        todo = new Todo({
            userId: id,
            message: req.body.message,
            team: req.body.team,
            status: req.body.status,
            priorite: req.body.priorite,
            createdAt: date
        })
        todo.save(function(err){
            if(err){
                reject(err);
            }
            resolve(true);
        })
    }) 
}
Todo.delete = function(id) {
    return new Promise((resolve, reject) => {
        Todo.findOneAndRemove({_id:id}, function (err) {
            if(err){
                reject(err);
            }
            resolve(true);
        })
    })
}

Todo.getById = function(id) {
    return new Promise((resolve, reject) => {
        Todo.find({_id:id}, function(err, todo){
            if(err) {
                reject(err);
            }
            resolve(todo[0]);
        })
    })
}
Todo.getAll = function() {
    return new Promise((resolve, reject) => {
        Todo.find({}, function(err, todos){
            if(err) {
                reject(err);
            }
            resolve(todos);
        })
    })
}
Todo.getAllForUser = function(id) {
    return new Promise((resolve, reject) => {
        Todo.find({userId:id}, function(err, todos){
            if(err) {
                reject(err);
            }
            resolve(todos);
        })
    })
}
module.exports = Todo;