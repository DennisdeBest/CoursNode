#SudRekt

##Utilisation avec la box vagrant
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
* cd dans /home/vagrant/SudRekt
* sudo node cli.js -S (sudo pour utiliser le port 80)
* sur la host dans un navigateur se rendre à l'url sudrekt.com

###Headless webscrapping

Lancer le script avec xvfb-run node cli.js -s

##Lancement du projet en local

###Utilisation
* cd dans le dossier project
* npm install
* sudo npm install -g pour l'utilisation des commandes du package.json

###Projet CLI
####Fichiers
* cli.js : le fichier principale depuis lequel sont lancé les autres fichiers
* scrapper.js : récupère le contenu des articles payants de sudouest.fr et les stock dans une BDD sqlite
* reader.js : retourne soit une liste avec les titres des articles disponibles soit le contenu d'un article.
* export.js : export un article sous format HTML si il n'existe pas encore
* server.js : lance un serveur web sur le port 80 qui affiche les articles de la BDD

####Fonctionnement

Dans le dossier project lancer le fichier cli.js avec **node cli.js**, **./cli.js** ou **sudrekt** si vous avez installé le paquet en global, les options sont :
* -r --read [numéro] Si un numéro est rentré affiche l'article correspondant sinon affiche la liste des articles disponibles, sauvegarde de l'article en fichier html possible que quand le fichier est lancé avec node cli.js ou ./cli.js (pas de droits d'écriture dans /usr/bin/..)
* -s --scrap : Lance scrapper.js et stockes les nouveaux articles dans la BDD
* -S --server : Démarre un serveur web pour l'affichage des articles sur le port 8080

##Améliorations à faire
* Envoie d'un mail quand un nouvel article est stocké en base (configurable)
* Fix du headless scrapping qui ne se lance pas tout le temps
* Utilisation d'un base de données MySQL pour éviter le problème de lock de sqlite sur des volumes partagés NFS
* Ecriture de logs infos et error sur lancement du scrapper et du serveur
* Utilisation de templates pour l'affichage web
* Stockage en text au lieu de html pour la lecture en CLI avec des retours à la ligne
* provisioning : 
    * Lancement du serveur sur vagrant up
    * Ajout du scrapping au cron +/- 5 heures
    * si MySQL création et copie de la base + dump de la base toutes les 24h
* ~~Injection de jQuery.min dans scrapper.js au lieu de jQuery~~
* Lancement de plusieurs instances de nightmare pour scrapper plusieurs page en mutlithread ? 
* Parcourir tout le site à la recherche d'articles premium pas que la première page

