var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('sudquest.db');
var Promise = require("bluebird");
var promises = [];
//db.serialize(function () {
//  db.run('CREATE TABLE if not exists infos (title, content)');
//})
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

		
			//promises.push(scrapLink(result[i]))
			//Promise.all(promises).then(function(){
				
			//	console.log(promises);
			//}
			//	);
			//Promise.all(promises).then(result => console.log('All promises resovled', result));
			Promise.all(promises)
  //.then(result => console.log('All promises resovled', result)) // Then ["Resolved!", "Rejected!"]
  .catch(err => console.log('Catch', err));
		//saveToDb(result.title, result.content)
	})
	.catch(function (error) {
		console.error('Search failed:', error);
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
		console.log(result.title);
		console.log(links);
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
	db.get("SELECT * FROM infos WHERE title='"+title+"'", function (err, row) {
		if(!row){
			db.run("INSERT INTO infos VALUES (?, ?)", [title, content]);
		}else {
			console.log("Record with the same title already exists");
		}
		db.close();

	});
	//console.log(db.query(query))
}

getLinks()