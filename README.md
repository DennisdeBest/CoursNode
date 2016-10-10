#SudRekt

###Prérequis

* Vagrant
* vagrant hostupdater
* Ansible (donc Linux ou Mac)

###Initialisation

* Cloner le repo
* cd dans le repo
* commande : vagrant up

###Utilisation (en dev)

* vagrant ssh pour ssh dans la VM
* lancer la commande nodemon -L "chemin du fichier à lancer"
* Pour afficher la page aller à ladresse coursnode.local::"port choisi" depuis la machine hôté
* modifier les fichiers dans le dossier project depuis la machine hôte, elle sont partagé avec la VM

###Headless webscrapping

Lancer le script avec xvfb-run node "le nom du script"

###Projet CLI 
####Fichiers
* cli.js : le fichier principale depuis lequel sont lancé les autres fichiers
* scrapper.js : récupère le contenu des articles payants de sudouest.fr et les stock dans une BDD sqlite
* reader.js : retourne soit une liste avec les titres des articles disponibles soit le contenu d'un article.
* export.js : export un article sous format HTML si il n'existe pas encore
* server.js : lance un serveur web sur le port 8080 qui affiche les articles de la BDD

####Fonctionnement

Dans le dossier project lancer le fichier cli.js avec **node cli.js** ou **./cli.js**, les options sont : 
* -r --read [numéro] Si un numéro est rentré affiche l'article correspondant sinon affiche la liste des articles disponibles
* -s --scrap : Lance scrapper.js et stockes les nouveaux articles dans la BDD
* -S --server : Démarre un serveur web pour l'affichage des articles sur le port 8080

