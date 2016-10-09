#!/usr/bin/node
	const Nightmare = require('nightmare');
	const nightmare = Nightmare({ show: true });
	const Promise = require("bluebird");
	const promises = [];

	const db = require('sqlite')

	module.exports = {
  run: function () {
    getLinks();
  },
};


	db.open('sudrekt.db').then(() => {
	  // Une fois la base ouverte, on créé une table
	  // On n'oublie pas le return qui va permettre de faire suivre la Promise
	  // et donc de gérer le "catch" plus bas, en cas d'erreur
	  return db.run('CREATE TABLE IF NOT EXISTS articles (title, content, date)')
	}).then(() => {
		console.log('> Database ready')
	}).catch((err) => { // Si on a eu des erreurs
		console.error('ERR> ', err)
	})

	//Main function, get all premium links from the site and pass them on to get scrapped
	function getLinks() {
		nightmare
		.goto('http://sudouest.fr')
		.wait('#cdx')
		.inject('js', `node_modules/jquery/dist/jquery.js`)
		.evaluate(function() 
		{
			var premiumObjects = $('.premium').find('h2').find('a');
			var premiumLinks = [];
			$.each(premiumObjects, function() 
			{
				premiumLinks.push($(this).attr('href'));
			});
			return premiumLinks;
		})
		.then(function (result) 
		{
			var links = result;
			parseLinks(links)
		})
	};

	//Function to scrap a single link,
	//Params : link(string)
	//Return : result(Article Object)
	var scrapLink = function(link)
	{
		return new Promise((resolve, reject) => {
			nightmare
			.goto('http://sudouest.fr'+link)
			.wait('.long')
			.inject('js', `node_modules/jquery/dist/jquery.js`)
			.screenshot('page.png')
			.evaluate(function () 
			{
				$('.ad-box').remove();
				if($('.long').text()) 
				{
					var title = $('.entry-title').html();
					var content = $('.long').html();
					var date = $('.publishing').html();
					var result = {
						title: title,
						content: content,
						date: date
					}
					return result;
				}
				else
					return "Not in page context";

			})
			.then(function (result) 
			{
			//console.log(result)
			resolve(result);
			//saveToDb(result.title, result.content)
		})
			.catch(function (error) 
			{
				reject(error);
				console.error('Search failed:', error);
			})
		})
	};

	//Due to the asynchronous nature of JS a recurrent function is needed
	//to wait for the result of the last page being scrapped before scrapping the next one
	// Params : links(array)
	function parseLinks(links){
		if(links.length > 0){
			var link = links.pop();
			console.log(link);
			scrapLink(link).then(function(result)
		{
			saveToDb(result.title, result.content, result.date)
			parseLinks(links);
		})
		}
		else {	
			//Set a timeout to make sure the last article is saved before exiting.
			setTimeout(function(){
				console.log("*****\nThe nightmare is over\n*****");
				process.exit()
			}, 10000);
		}
	}

	//Save an article to the database
	//Params : title(string), content(string), data(string)
	function saveToDb(title, content, date){
		if (!title){
			return Promise.reject(new Error("Missing title"));
		}
		if (!content){
			return Promise.reject(new Error("Missing content"));
		}
		if (!date){
			return Promise.reject(new Error("Missing date"));
		}

		//make sure the record doesn't already exist
		db.get("SELECT * FROM articles WHERE title=?",title).then((response) => {
			if(!response){
				console.log("New article inserted");
				return db.run("INSERT INTO articles VALUES (?, ?, ?)", title, content, date);
			}else {
				return console.log("Record with the same title already exists");
			}
		})		
	}