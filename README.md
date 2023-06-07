
SERVER FRONT END ET KEYCLOACK

POUR FAIRE LA CONCEPTION DE ANGULAR, LE DEV DOIT AVOIR NODEJS ET NPM DE TELECHARGE <br/>
IL EST FORT RECOMMANDER D'UTILISER NVM POUR LA GESTION DES VERSION DE NODEJS <br/>

# Référence:
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04

# Installation NVM
**curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh** <br/>
**curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh** | bash <br/>
**source ~/.bashrc** <br/>
**nvm list-remote** <br/>
**nvm install v18** <br/>
**nvm list** <br/>

Assurez vous d'avoir la version 18.16.0 en utilisation avec : <br/>
**nvm use 18.16.0** <br/>
Valider avec : <br/>
**nvm list** <br/>


# Installation de ANGULAR
Ref : https://angular.io/guide/setup-local <br/>
**npm install -g @angular/cli** <br/>

# BUILD LE PROJET ANGULAR
DANS LE DOSSIER **/application** FAIRE LA COMMANDE : <br/>

**npm install** <br/>
**ng serve --open** <br/>
