import { Injectable } from '@angular/core';
import { AuthentificationService } from './authentification.service';
import { HttpClient } from '@angular/common/http';


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

    var fullName : string;

    fullName = "User";

    /*this.http.get<any>("http://localhost:8888/session/nom").subscribe({
      next: (response)=>{
        console.log("===========================");
        fullName = response.fullName;
      },
      error: (error)=>{
        console.error(error);
      }
      
    }
    );*/

    return fullName;
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
