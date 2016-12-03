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

Todo.update = function(req,id) {
    return new Promise((resolve, reject) => {
        var date =  new Date();
        Todo = new Todo({
            userId: id,
            message: req.body.message,
            team: req.body.team,
            status: req.body.status,
            priorite: req.body.priorite,
            updatedAt: date
        })
        Todo.save(function(err){
            if(err){
                reject(err);
            }
            resolve(true);
        })
    }) 
}

Todo.Insert = function(req,id) {
    return new Promise((resolve, reject) => {
        var date =  new Date();
        Todo = new Todo({
            userId: id,
            message: req.body.message,
            team: req.body.team,
            status: req.body.status,
            priorite: req.body.priorite,
            createdAt: date
        })
        Todo.save(function(err){
            if(err){
                reject(err);
            }
            resolve(true);
        })
    }) 
}
    /*console.log(req.body.status)
    if (req.body.status == 0) {
        var status = 1
    } else {
        var status = 0
    }
    console.log(status)*/

    Todo.delete = function(req) {
        return new Promise((resolve, reject) => {
            Todo.findOneAndRemove({id:req.body.id}, function (err) {
                if(err){
                    reject(err);
                }
                console.log('User deleted!');
                resolve(req.body.id);
            })
        })
    }

    Todo.getById = function(req) {
        return new Promise((resolve, reject) => {
            Todo.find({id:req.body.id}, function(err, user){
                if(err) {
                    reject(err);
                }
                console.log('User deleted!');
                resolve(user);
            })
        })
    }
    module.exports = Todo;