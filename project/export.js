#!/usr/bin/node
const fs = require ('fs')
const Promise = require('bluebird')

module.exports = {
	one: function(article){
		var articleHTML = "<meta charset=\"UTF-8\"> " +
		"<link rel=\"stylesheet\" type=\"text/css\" href=\"http://assets.sudouest.fr/stylesheets/main/main.css?v=1473062945\">" +
		"<body>" + article + "</body></html>";

		fs.writeFile(__dirname+"/article.html", articleHTML, function(err) {
				if(err) {
					return console.log(err);
				}

				console.log("The file was saved!");
			})
		}
	}