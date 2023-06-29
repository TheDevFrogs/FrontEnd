import { Injectable } from '@angular/core';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthedUserService {

  keycloak : AuthentificationService;

  constructor(keycloack : AuthentificationService) {
    this.keycloak = keycloack;
   }

  getUserFullName(){
    // TODO : Implementer la requete
    return "Username";
  }

  getUserSemesters(){
    // TODO : Implementer la requete
    return ['Automne 2022','Hivers 2023','Été 2023'];
  }

  getUserTeachings(){
    // TODO : Implementer la requete
    return ['Automne 2022','Hivers 2023','Été 2023'];
  }


}
