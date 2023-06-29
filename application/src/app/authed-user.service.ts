import { Injectable } from '@angular/core';
import { AuthentificationService } from './authentification.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthedUserService {

  keycloak : AuthentificationService;

  userName : string;

  constructor(keycloack : AuthentificationService, private http : HttpClient) {
    this.keycloak = keycloack;
    this.userName = "ok"
  }

  getUserFullName(){
    return this.http.get<any>("http://localhost:8888/session/nom");
  }

  getSemesters(){
    return this.http.get<any>("http://localhost:8888/session/sessions");
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
