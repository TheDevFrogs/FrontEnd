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
  assignmentID : string;



  currentUser : AuthedUserService;

  homework : Homework;

  constructor(currentUser : AuthedUserService){
    this.selectedClass = String(this.route.snapshot.params['selectedClass']);


    this.currentUser = currentUser;

    this.homework = new Homework("ok","ok","ok","1");

  }

  public async ngOnInit(){
    
    this.assignmentID = String(this.route.snapshot.queryParamMap.get('assignmentId'));


    this.currentUser.getAssignment(this.assignmentID).subscribe({
      next: (response)=>{
        console.log(response);




      },
      error: (err)=>{
        console.log(err);
      }

    });



  }


}
