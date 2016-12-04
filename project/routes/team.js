const router = require('express').Router()
const Team = require('../models/team.js')

router.get('/add', (req, res) => {
	res.format({
		html: () => {res.render("teams/edit")},
		json: () => {
			res.status(401);
			res.send("Bad request");
		}
	});
})

router.post('/', function(req, res) {
	if (req.body.name != '') {
		Team.insert(req).then(() => {
			res.format({
				html: function(){
					res.redirect("/teams")
				}, 
				json: function() {
					res.send(team);
				}
			});
		})
	}
})

router.get('/', (req, res, next) => {
	var id = req.cookies.AccessToken.id;
	Team.getAll().then((teams) => {
		res.format({
			html: function(){
				res.render("teams/index", {teams: teams});
			}, 
			json: function() {
				res.send(team);
			}
		});
	}).catch(next)
})

router.delete('/:teamid', (req, res) => {
	Team.delete(req.params.teamid).then(() => {
		res.format({
			html: function(){
				res.redirect("/teams")
			}, 
			json: function() {
				var response = JSON.stringify({
					'code': 200,
					'message': "team deleted",});
				res.send(response);
			}
		});
	}).catch((err) => {
		res.status(500).end();
	});
})

router.get("/:teamid/edit", (req, res) => {
	Team.getById(req.params.teamid).then((team) => {
		res.format({
			html: function(){
				res.render("teams/edit", {team: team});
			}, 
			json: function() {
				res.send(team);
			}
		});
	}).catch((err) => {
		res.status(500).end();
	});
})

router.put('/:teamid', (req, res) => {
	console.log(req.body)
	Team.update(req, req.body.teamid).then(() => {
		res.format({
			html: function(){
				res.redirect("/teams")
			}, 
			json: function() {
				var response = JSON.stringify({
					'code': 200,
					'message': "team updated",});
				res.send(response);
			}
		});
	}).catch((err) => {
		res.status(500).end();
	});
});

module.exports = router

