#!/usr/bin/node
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const Promise = require("bluebird");
const promises = [];
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Scrapper');
const Schema = mongoose.Schema;
module.exports = {
	run: function () {
		getLinks();
	},
};

var articleSchema = new Schema({
	title: String,
	content : String,
	date : String
})

var logSchema = new Schema({
	level: String,
	message: String,
	date: Date
})

var Log = mongoose.model('Log', logSchema);
var Article = mongoose.model('Article', articleSchema);

log("1", "NightmareStarted");
	//Main function, get all premium links from the site and pass them on to get scrapped
	function getLinks() {
		console.log("Get links");
		nightmare
		.goto('http://sudouest.fr')
		.wait('#cdx')
		.inject('js', `node_modules/jquery/dist/jquery.min.js`)
		.evaluate(function() 
		{
			var premiumObjects = $('.premium').find('h2').find('a');
			var premiumLinks = [];
			$.each(premiumObjects, function() 
			{
				premiumLinks.push($(this).attr('href'));
			});
			log("1", premiumLinks[0]);
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
		console.log(link);
		return new Promise((resolve, reject) => {
			nightmare
			.goto('http://sudouest.fr'+link)
			.wait('.long')
			.inject('js', `node_modules/jquery/dist/jquery.js`)
			.screenshot('page.png')
			.evaluate(function () 
			{
				$('.ad-box').remove();
				$('.promo-payant').remove();
				$('#pub_teads').remove();
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
		console.log(links)
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
			}, 5000);
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
		return new Promise((resolve, reject) => {
			article = new Article({
				message: message,
				content: content,
				date: date
			})
			article.save(function(err){
				if(err){
					reject(err);
				}
				resolve(true);
			})
		})
		//make sure the record doesn't already exist	
	}

	function log(level, message){
		return new Promise((resolve, reject) => {
			var date = new Date();
			log = new Log({
				level: level,
				message: message,
				date: date
			})
			log.save(function(err){
				if(err){
					reject(err);
				}
				resolve(true);
			})
		})
	}
