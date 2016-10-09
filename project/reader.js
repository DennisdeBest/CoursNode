#!/usr/bin/node
const db = require('sqlite')

module.exports = {
	list: function() {
		db.open('sudrekt.db').then(() => {
			return db.run('CREATE TABLE IF NOT EXISTS articles (title, content, date)')
		}).then(() => {
			console.log('> Database ready')
			db.all('SELECT rowid, * FROM articles').then((articles) => {
    // ...on fait une boucle commentaire par commentaire
    for (let i = 0, l = articles.length; i < l; i++) {
    	let article = articles[i]
    	console.log(article.rowid + "." + article.title)
    }
  }).catch((err) => { // On gère les erreurs possibles
  	console.error('ERR> ', err)
  })
})
	},
	one: function(number) {
		db.open('sudrekt.db').then(() => {
			return db.run('CREATE TABLE IF NOT EXISTS articles (title, content, date)')
		}).then(() => {
			console.log('> Database ready')
			db.get('SELECT * FROM articles WHERE rowid = ?', number).then((article) => {
				console.log(article.title + article.date + "\n" + article.content)
			})
  }).catch((err) => { // On gère les erreurs possibles
  	console.error('ERR> ', err)
  })
}
}