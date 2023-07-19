import { Injectable, ɵNG_INJ_DEF } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


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

  getClasses(sessionId : string, type : string){
    return this.http.get<any>(this.serverAdress + "/session/classes/" + type + "/sessionId=" + sessionId) ;
  }

  getStudentAssignment(assingmentID : string){
    return this.http.get<any>(this.serverAdress + "/assignment/studentpreview/assignmentId=" + assingmentID);
  }

  getTeacherAssignment(assingmentID : string){
    return this.http.get<any>(this.serverAdress + "/assignment/teacherpreview/assignmentId=" + assingmentID);
  }
  
  delete(assignmentID : string){
    return this.http.delete<any>(this.serverAdress + "/assignment/delete/assignmentId=" + assignmentID);
  }

  downloadAssignmentFile(id_file : string){
    let params = new HttpParams();
    params = params.append("ok", "okok");
    return this.http.get<any>(this.serverAdress + "/file/download/handedassignmentfile/fileId=" + id_file, {params: params, responseType: 'blob' as 'json'});
  }

  createAssignment(group_id : string, name : string, description : string, due_date : string, close_date : string, available_date : string, content: Blob){
    const formData = new FormData();

    formData.append("group_id", group_id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("due_date", due_date);
    formData.append("close_date", close_date);
    formData.append("available_date", available_date);
    formData.append("file", content);

    return this.http.post<any>(this.serverAdress + "/assignment/create", formData);
  }

  updateAssignment(id_assignment : string, name : string, description : string, due_date : string, close_date : string, available_date : string, content: Blob){
    const formData = new FormData();

    formData.append("id_assignment", id_assignment);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("due_date", due_date);
    formData.append("close_date", close_date);
    formData.append("available_date", available_date);
    formData.append("file", content);

    return this.http.post<any>(this.serverAdress + "/assignment/update", formData);
  }


  handInFile(assignmentId : string, content : Blob){
    const formData = new FormData();

    formData.append("assignmentId", assignmentId);
    formData.append("file", content);

    return this.http.post(this.serverAdress + "/assignment/hand", formData);
  }




}
