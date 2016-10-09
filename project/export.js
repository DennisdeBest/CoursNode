#!/usr/bin/node
const fs = require ('fs')
const Promise = require('bluebird')

module.exports = {
	one: function(article){
		var articleString = article.title + article.date + article.content;
		var articleHTML = "<meta charset=\"UTF-8\"> " +
		"<link rel=\"stylesheet\" type=\"text/css\" href=\"http://assets.sudouest.fr/stylesheets/main/main.css?v=1473062945\">" +
		"<body>" + articleString + "</body></html>";

		var dir = __dirname + "/articles/";
		var filename = slugify((article.title).substr(0,25))+".html";
		var filepath = dir + filename;

		fs.stat(filepath, function(err, stat) {
			if(err == null) {
				console.log('File already exists ! ');
			} else if(err.code == 'ENOENT') {
				saveFile(filepath, articleHTML)
			} else {
				console.log('Some other error: ', err.code);
			}
		});

		
	}
}

function slugify(text)
{
	return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

function saveFile(path, data){
	fs.writeFile(path, data, function(err) {
		if(err) {
			return console.log(err);
		}

		console.log("File saved to "+path);
	})
}