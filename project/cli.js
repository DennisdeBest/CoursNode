#!/usr/bin/node
const program = require('commander')
const inquirer = require('inquirer')
const scrapper = require('./scrapper.js')
const reader = require('./reader.js')
const exportArticle = require('./export.js')
const server = require('./server.js')

//Init program
program
.version('1.0.0')
.option('-r, --read [number]', 'Show available articles or enter a number to display an article')
.option('-s, --scrap', 'Scrap SudOuest.fr')
.option('-S, --server', 'Start a server to display the articles on port 8080')

// On parse (convertit en format utilisable) les options
// fonction synchrone
program.parse(process.argv)

//Read the arguments
if (program.read) {
	if(program.read === true) {
		reader.list().then(function(){
			inquirer.prompt([
			{
				type:'input',
				message:'Enter the number of the article you want to read',
				name:'articleNum'
			}]).then((number) => {
				reader.one(number.articleNum).then(article => {
					console.log(article.content);
					saveOneArticle(article);
				})

			})
		})
	}
	else {
		if(isNaN(program.read)){
			console.log("not a valid number")
		}
		else {
			reader.one(program.read).then(article => {
					console.log(article.content);
					saveOneArticle(article);
				})
		}

	}
} else if (program.scrap) {
	scrapper.run();
} else if (program.server) {
	server;
} else {
	program.help()
}


//Save one article to HTML by calling exportArticle.one
function saveOneArticle(article){
	inquirer.prompt([
	{
		type:'input',
		message:'save article to HTML file ? (y/n)',
		name:'save'
	}
	]).then((save) => {
		if(save.save == 'y'){
			exportArticle.one(article);
		}
		else{
			console.log("Article not saved")
		}
	});
}