import { Homework } from './../homework';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { AuthedUserService } from '../authed-user.service';
import { DropBoxComponent } from '../drop-box/drop-box.component';

@Component({
  selector: 'app-consultation-travaux',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, DropBoxComponent],
  templateUrl: `./consultation-travaux.component.html`,
  styleUrls: ['./consultation-travaux.component.css']
})
export class ConsultationTravauxComponent {
  route : ActivatedRoute = inject(ActivatedRoute);

  selectedClass : string;
  sessionID : string;
  assignmentID : string;



  currentUser : AuthedUserService;

  homework : Homework;

  constructor(currentUser : AuthedUserService){
    this.selectedClass = String(this.route.snapshot.params['selectedClass']);
    this.sessionID = String(this.route.snapshot.params['sessionID'])
    this.assignmentID = String(this.route.snapshot.params['assignmentID'])


    this.currentUser = currentUser;

    this.homework = new Homework("ok", "ok", "ok", "1");

  }

  public async ngOnInit(){
    

    this.currentUser.getAssignment(this.assignmentID).subscribe({
      next: (response)=>{
        console.log(response);
        //this.homework.description = response.description;
        //this.homework.status = response.status;
      },
      error: (err)=>{
        console.log(err);
      }

    });



  }

  public simulatePost(){
    this.currentUser.createAssignment();
  }


}
