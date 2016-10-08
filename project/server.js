const http = require('http');
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const Promise = require("bluebird");
const promises = [];
const path = require('path');

const db = require('sqlite')

const TPL_HEAD = `
<html>
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css" href="http://assets.sudouest.fr/stylesheets/main/main.css?v=1473062945">
<style>
body {
	padding: 15px;
	width:80%;
	min-width: 500px;
	margin: auto;
}
.title {
	text-align: center;
}
</style>
<title>SudRekt</title>
<body>
<h1 class="title">SudRekt</h1>
`

const TPL_FOOT = `
</body>
</html>
`


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

http.createServer((req, res) => {
    showPage(req, res)
}).listen(8080);

function showPage (req, res) {
  // Statut: 200, Contenu: page HTML
  res.writeHead(200, {'Content-Type': 'text/html'})

  // On commence à écrire le début de notre HTML
  res.write(TPL_HEAD)

  // On lance la récupération des commentaires
  // Puis ensuite, une fois chargés...
  db.all('SELECT * FROM articles ORDER BY date DESC').then((articles) => {
    // ...on fait une boucle commentaire par commentaire
    for (let i = 0, l = articles.length; i < l; i++) {
      let article = articles[i]

      // On écrit le commentaire
      res.write(`
      	<h1 class="title extra-large bitter entry-title">${article.title}</h2>
        <p class="article">
           ${article.content}
        </p>
        <hr>
      `)
    }
  }).catch((err) => { // On gère les erreurs possibles
    console.error('ERR> ', err)
  }).then(() => { // Dans tous les cas
    // On écrit la fin de la page
    res.write(TPL_FOOT)

    // On finalise la réponse
    res.end()
  })
}