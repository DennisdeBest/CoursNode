#!/usr/bin/node
const program = require('commander')
const inquirer = require('inquirer')
const scrapper = require('./scrapper.js')
const reader = require('./reader.js')
const exportArticle = require('./export.js')

program
.version('1.0.0')
.option('-e, --export', 'Export articles to HTML file')
.option('-r, --read [number]', 'Show available articles or enter a number to display an article')
.option('-s, --scrap', 'Scrap SudOuest.fr')

// On parse (convertit en format utilisable) les options
// fonction synchrone
program.parse(process.argv)

if (program.read) {
	if(program.read == true) {
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
} else {
	program.help()
}

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