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

  getAssignment(assingmentID : string){
    return this.http.get<any>(this.serverAdress + "/assignment/assignment/" + assingmentID);
  }


  createAssignment(){
    const body = {
      group_id : '2',
      name: '', 
      description: '', 
      due_date: '',
      close_date: '',
      available_date: '',
    }

    this.http.post<any>(this.serverAdress + "/assignment/create", body);


  }


  uploadFile(content : Blob){
    const formData = new FormData();

    formData.append("fichier", content);

    this.http.post(this.serverAdress + "/", formData);



  }




}
