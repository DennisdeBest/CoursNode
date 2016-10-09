#!/usr/bin/node
const db = require('sqlite')
const Promise = require("bluebird")
module.exports = {
	list: function() {
		return new Promise((resolve, reject) => {
				db.open('sudrekt.db').then(() => {
			db.run('CREATE TABLE IF NOT EXISTS articles (title, content, date)')
		}).then(() => {
			console.log('> Database ready')
			return db.all('SELECT rowid, * FROM articles').then((articles) => {
    for (let i = 0, l = articles.length; i < l; i++) {
    	let article = articles[i]
    	console.log(article.rowid + "." + article.title)
    }
    resolve();
  }).catch((err) => { // On gère les erreurs possibles
  	console.error('ERR> ', err)
  })
})
		})

	
	},
	one: function(number) {
		return new Promise((resolve, reject) => {
		db.open('sudrekt.db').then(() => {
			db.run('CREATE TABLE IF NOT EXISTS articles (title, content, date)')
		}).then(() => {
			console.log('> Database ready')
			db.get('SELECT * FROM articles WHERE rowid = ?', number).then((article) => {
				resolve(article)
				//console.log(article.title + article.date + "\n" + article.content)
			})
  }).catch((err) => { // On gère les erreurs possibles
  	console.error('ERR> ', err)
  })
		})

}
}