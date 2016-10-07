var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('sudquest.db');

db.serialize(function () {
  db.run('CREATE TABLE if not exists infos (title, content)');
})
function scrap() {
	nightmare
	.goto('http://sudouest.fr')
	.click('.premium img')
	.inject('js', `node_modules/jquery/dist/jquery.js`)
	.wait('.article')
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
	.end()
	.then(function (result) {
		//console.log(result)
		saveToDb(result.title, result.content)
	})
	.catch(function (error) {
		console.error('Search failed:', error);
	});

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
    	return db.run("INSERT INTO infos VALUES (?, ?)", [title, content]);
    }else {
    	console.log("Record with the same title already exists");
    }
    ;
  });
	//console.log(db.query(query))
	}

scrap()