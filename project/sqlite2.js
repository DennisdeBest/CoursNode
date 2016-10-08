// Définition de nos dépendances
const http = require('http')
const qs = require('querystring')
const db = require('sqlite')

// Définition de nos constantes
const PORT = 8081

db.open('livre-d-or.db').then(() => {
  // Une fois la base ouverte, on créé une table
  // On n'oublie pas le return qui va permettre de faire suivre la Promise
  // et donc de gérer le "catch" plus bas, en cas d'erreur
  return db.run('CREATE TABLE IF NOT EXISTS comments (pseudo, comment, createdAt)')
}).then(() => {
  console.log('> Base de donnée prête')
  db.close();
}).catch((err) => { // Si on a eu des erreurs
  console.error('ERR> ', err)
})

function saveComment(commentData) {
  // Simple vérification pour être sûr d'avoir un pseudo et un commentaire non vide
  if (!commentData.pseudo || !commentData.comment || commentData.comment == '' || commentData.pseudo == '') {
    // Si on a une erreur, on peut faire quelque chose de malin, que je n'ai pas dit en cours
    // Sur Promise, on a des méthodes de de classe, notemment `all` (vu en cours), mais aussi `resolve` et `reject`
    // qui retourne des Promise, déjà résolu, ou rejeté avec ce qu'il y a en argument
    // Ici on Promise.reject() retournera donc une nouvelle Promise déjà rejetée (jamais passé par le statut "en attente")
    return Promise.reject(new Error('Il y a un problème avec le formulaire'))
  }

  // On récupère la date sous forme de Timestamp
  let timestamp = (new Date()).getTime()

  // On insère en base, et on retourne une Promise, ça tombe, bien les méthodes de db retournent des Promise ;)
  return db.run('INSERT INTO comments VALUES (?, ?, ?)', commentData.pseudo, commentData.comment, timestamp)
}
