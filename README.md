#VM pour le développement NodeJS

###Prérequis

* Vagrant
* vagrant hostupdater
* Ansible (donc Linux ou Mac)

###Initialisation

* Cloner le repo
* cd dans le repo
* commande : vagrant up

###Utilisation

* vagrant ssh pour ssh dans la VM
* lancer la commande nodemon -L "chemin du fichier à lancer"
* Pour afficher la page aller à ladresse coursnode.local::"port choisi" depuis la machine hôté
* modifier les fichiers dans le dossier project depuis la machine hôte, elle sont partagé avec la VM
