var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({  
    name: String,
})

var Team = mongoose.model('Team', teamSchema)

Team.update = function(req, id) {
	console.log(req.body);
	console.log(id)
    return new Promise((resolve, reject) => {
        Team.findById(id, function(err, team){
            if(err){
                reject(err);
            }
            var date =  new Date();
            team.name = req.body.name;
           
            team.save(function(err){
                if(err){
                    reject(err);
                } else {
                    resolve(true);
                }
            })      
        }) 
    })
}

Team.insert = function(req, id) {
    return new Promise((resolve, reject) => {
        var date =  new Date();
        team = new Team({
            name: req.body.name
        })
        team.save(function(err){
            if(err){
                reject(err);
            }
            resolve(true);
        })
    }) 
}
Team.delete = function(id) {
    return new Promise((resolve, reject) => {
        Team.findOneAndRemove({_id:id}, function (err) {
            if(err){
                reject(err);
            }
            resolve(true);
        })
    })
}

Team.getById = function(id) {
    return new Promise((resolve, reject) => {
        Team.find({_id:id}, function(err, team){
            if(err) {
                reject(err);
            }
            resolve(team[0]);
        })
    })
}
Team.getAll = function() {
    return new Promise((resolve, reject) => {
        Team.find({}, function(err, teams){
            if(err) {
                reject(err);
            }
            resolve(teams);
        })
    })
}
module.exports = Team;