import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthedUserService } from '../authed-user.service';

@Component({
  selector: 'app-side-bar-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./side-bar-content.component.html`,
  styleUrls: ['./side-bar-content.component.css']
})
export class SideBarContentComponent {

  semesterList: string[];
  teachingList: string[];

  showSemester: boolean;
  showTeachings: boolean;

  selectedOne = 'empty';

  constructor(currentUser: AuthedUserService){
    this.semesterList = currentUser.getUserSemesters();
    this.teachingList = currentUser.getUserTeachings();

    this.showSemester = this.semesterList.length > 0;
    this.showTeachings = this.teachingList.length > 0;

    if(!this.showSemester && !this.showTeachings){
      this.selectedOne = 'error';
    }
    else if(this.showSemester){
      this.selectedOne = 's' + this.getLink(this.semesterList[0]);
    }
    else{
      this.selectedOne = 't' + this.getLink(this.teachingList[0]);
    }

  }

  getLink(name: string){
    return name.toLowerCase().replace(/\W/g, '');
  }




}
