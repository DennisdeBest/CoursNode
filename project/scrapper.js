var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });
var db = require('sqlite');

db.open('sudquest.db').then(() => {
	return db.run('CREATE TABLE if not exists infos (infos)')
}).then(() => {
	console.log('> DB created')
}).catch((err) => {
	console.log('ERR>', err)
})

function scrap() {
	nightmare
	.goto('http://sudouest.fr')
	.click('.premium img')
	.inject('js', `node_modules/jquery/dist/jquery.js`)
	.wait('.long')
	.screenshot('page.png')
	.evaluate(function () {
		if($('.long').text()) {
			var output = $('.long').text();
			return output;
		}
		else
			return "Not in page context";

	})
	.end()
	.then(function (result) {
		console.log(result)
		saveToDb(result)
	})
	.catch(function (error) {
		console.error('Search failed:', error);
	});

}

function saveToDb(input){
	if (!input){
		return Promise.reject(new Error("no input"));
	}
	return db.run("INSERT INTO infos VALUES (?)", input);
};

scrap()