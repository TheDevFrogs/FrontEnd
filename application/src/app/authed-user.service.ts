import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthedUserService {

  constructor() { }

  getUserFullName(){
    // TODO : Implementer la requete
    return 'Utilisateur';
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
