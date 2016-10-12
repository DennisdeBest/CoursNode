
Skip to content
This repository

    Pull requests
    Issues
    Gist

    @DennisdeBest

1
0

    0

DennisdeBest/CoursNode
Code
Issues 0
Pull requests 0
Projects 0
Wiki
Pulse
Graphs
Settings
CoursNode/project/export.js
55e7f32 3 days ago
@DennisdeBest DennisdeBest Remove publicity block from scrapped pages
55 lines (47 sloc) 1.74 KB
#!/usr/bin/node
const fs = require ('fs')
const Promise = require('bluebird')

//Make function accesible to another script
module.exports = {
	one: function(article){
		//Turn the article into usable HTML
		var articleString = "<h1 class=\"title extra-large bitter entry-title\">"+article.title +"</h1>"+ article.date +"<br>"+ article.content;
		var articleHTML = "<html><meta charset=\"UTF-8\"> " +
		"<link rel=\"stylesheet\" type=\"text/css\" href=\"http://assets.sudouest.fr/stylesheets/main/main.css?v=1473062945\">" +
		"<style> .content { width: 1000px; margin:auto;} </style>" + 
		"<body><div class=\"content\">" + articleString + "</div></body></html>";

		//Set save dir and name
		var dir = __dirname + "/articles/";
		var filename = slugify((article.title).substr(0,25))+".html";
		var filepath = dir + filename;

		//Check if the file exists, if so do not save.
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

//slugify article title for filename
function slugify(text)
{
	return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

//if no file exists save the article to HTML file
function saveFile(path, data){
	fs.writeFile(path, data, function(err) {
		if(err) {
			return console.log(err);
		}

		console.log("File saved to "+path);
	})
}

    Contact GitHub API Training Shop Blog About 

    © 2016 GitHub, Inc. Terms Privacy Security Status Help 


