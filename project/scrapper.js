var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });
var Promise = require("bluebird");
var promises = [];

const db = require('sqlite')

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


function getLinks() {
	nightmare
	.goto('http://sudouest.fr')
	.wait('#cdx')
	.inject('js', `node_modules/jquery/dist/jquery.js`)
	.evaluate(function() {
		var premiumObjects = $('.premium').find('h2').find('a');
		var premiumLinks = [];
		$.each(premiumObjects, function() {
			premiumLinks.push($(this).attr('href'));
		});
		return premiumLinks;
	})
	.then(function (result) {
		//var scrapLink= Promise.promisify(scrapLink())
		var links = result;
		//console.log(result)
		parseLinks(links)
	});


}

var scrapLink = function(link){
	return new Promise((resolve, reject) => {
		//console.log('http://sudouest.fr'+link);
		nightmare
		.goto('http://sudouest.fr'+link)
		.wait('.long')
		.inject('js', `node_modules/jquery/dist/jquery.js`)
		.screenshot('page.png')
		.evaluate(function () {
			if($('.long').text()) {
				var title = $('.entry-title').text();
				var content = $('.long').text();
				var result = {
					title: title,
					content: content
				}
				return result;
			}
			else
				return "Not in page context";

		})
		.then(function (result) {
		//console.log(result)
		resolve(result);
		//saveToDb(result.title, result.content)
	})
		.catch(function (error) {
			reject(error);
			console.error('Search failed:', error);
		});

	});

};

function parseLinks(links){
	console.log(links.length);
	if(links.length > 0){
		var link = links.pop();
		console.log(link);
	}
	else {
		return false;
	}

	scrapLink(link).then(function(result)
	{
		//console.log(result.title);
		//console.log(links);

		saveToDb(result.title, result.content)
		parseLinks(links);
	})
}


function saveToDb(title, content){
	if (!title){
		return Promise.reject(new Error("Missing title"));
	}
	if (!content){
		return Promise.reject(new Error("Missing content"));
	}

	//make sure the record doesn't already exist
	db.get("SELECT * FROM articles WHERE title=?",title).then((response) => {
console.log(response);
		if(!response){
			console.log("New article inserted");
			return db.run("INSERT INTO articles VALUES (?, ?, ?)", title, content, 1);
		}else {
			console.log("Record with the same title already exists");
		}
	})
		
	//	db.close();


	}
	

getLinks()