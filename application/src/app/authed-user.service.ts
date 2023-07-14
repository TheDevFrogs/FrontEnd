import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthedUserService {

  userName : string;

  serverAdress : string;

  constructor(private http : HttpClient) {
    this.userName = "ok"
    this.serverAdress = "http://localhost:8888";
  }

  // Gets the logged in user full name (First name + Last name)
  getUserFullName(){
    return this.http.get<any>(this.serverAdress + "/user/information");
  }

  getSemesters(){
    return this.http.get<any>(this.serverAdress + "/session/sessions");
  }

  getClasses(sessionId : string, roleID : string){
    return this.http.get<any>(this.serverAdress + "/session/classes/" + sessionId + "/" + roleID);
  }

  getClassInfo(classTag : string){
    return this.http.get<any>(this.serverAdress + "/cours/" + classTag);
  }

  uploadFile(content : Blob){
    const formData = new FormData();

    formData.append("fichier", content);

    this.http.post(this.serverAdress + "/", formData);



  }




}
