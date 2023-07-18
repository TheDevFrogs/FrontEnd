import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthedUserService } from '../authed-user.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-side-bar-content',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: `./side-bar-content.component.html`,
  styleUrls: ['./side-bar-content.component.css']
})
export class SideBarContentComponent {

  response : any;

  semesterList;
  teachingList;

  showSemester: boolean | undefined;
  showTeachings: boolean | undefined;

  selectedSession = 'empty';

  currentUser : AuthedUserService;

  constructor(currentUser: AuthedUserService){
    this.currentUser = currentUser;

    this.semesterList = [];
    this.teachingList = [];

    this.showSemester = false;
    this.showTeachings = false;


  }

  public async ngOnInit(){

    this.currentUser.getSemesters().subscribe({
      next:(response)=>{

        this.response = response;

        this.semesterList = response.Etudiant;
        this.teachingList = response.Enseignant;

        this.showSemester = this.semesterList.length > 0;
        this.showTeachings = this.teachingList.length > 0;

        this.showSemester = true;
        this.showTeachings = true;
    
        if(!this.showSemester && !this.showTeachings){
          this.selectedSession = 'error';
        }
        else if(this.showSemester){
          this.selectedSession = this.semesterList[0];
        }
        else{
          this.selectedSession = this.teachingList[0];
        }
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }


  getLink(name: string){
    return name.toLowerCase().replace(/\W/g, '');
  }

  setSelection(type : string ,selection : string){
    this.selectedSession = type + selection;
  }

  verifySelection(type : string, selection : string){
    return this.selectedSession=== (type + selection);
  }



}
