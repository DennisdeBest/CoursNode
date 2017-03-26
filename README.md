#Todo List nodeJS

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

###Le projet

Il y a plusieurs aspects à ce projet que nous allons détailler.

####Une gestion utilisateur et session

Il y a une base de données redis qui stock des ensemble (userid:token), quand un utilisateur se connecte on vérifie si un cookie AccesToken est présent.
Si ce cookie est éffectivement présent on compare la valeur du token du cookie à la valeur du token de la base redis.
Si la valeur est la même alors l'utilisateur est redirigé vers la page souhaité, sinon il devra s'authentifier.
Le ttl du cookie et de l'enregistrement en base redis est de 30min.

il est possilbe d'enregistrer de nouveaux utilisateurs sur le site ou par le biais de l'API.
Les utilisateurs peuvent se déconnecter de leurs sessions à tout moment en cliquant sur le lien logout.

Nous pouvons à tout moment éditer ou supprimer un utilisateur grâce aux boutons d'actions de la liste de utilisateurs.

####Des équipes

Une gestion d'équipes est également mis en place, une tâche peut donc être assigné à une équipe en plus d'un individu.
Les équipes se créent, modifient et supprime commes les utilisateurs par le site ou l'API.

A la création ou la modification d'une tâche une liste avec les équipes présentent en base sera généré automatiquement.

###Les tâches (Todos)

Comme pour les utilisateurs et les équipes les tâches peuvent être gèré par l'API ou le site.
Chaque tâche contient un utilisateur (celui qui l'as créé), une priorité (1-5), une équipe et un status (0 par défaut pour une tâche pas encore terminée, 1 quand la tâche est terminée).
Nous pouvons rapidement identifier les tâches terminées dans la liste car ils ont une couleur plus proche de l'arrière plan et ils sont également barrées.

Une fois connecté, un utilisateur sera redirigé sur la liste des tâches qu'il a créé.

###Fonctionnement
####Vagrant

Une fois la vagrant démarré et que vous avez ouvert une session ssh au sein de la vm il y a plusieurs étapes pour lancer le projet :
* cd /home/vagrant/project 
* npm install (les paquets sont installés par ansible en principe mais ça ne fait pas de mal)
* mongod &>/dev/null (démarrer le serveur mongo et rediriger sur la sortie standard)
* nodemon app.js

Le serveur redis est déja lancé au démarrage de la machine.
Vous pouvez ensuite ouvrir un navigateur sur la machine hote et aller à l'adresse to.do:8080.

Il faut maintenant créer un nouvel utilisateur, attention pour que l'utilisateur soit valide il faut rentrer un mot de passe de 8 charactères avec au moins une majuscule et un chiffre 

####Docker-compose
Faites un docker-compose up dans le répertoire project.
Dans votre navigateur allez sur localhost:8884

