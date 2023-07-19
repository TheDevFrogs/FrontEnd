import { Homework } from './../homework';
import { Component, inject } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { AuthedUserService } from '../authed-user.service';
import { DropBoxComponent } from '../drop-box/drop-box.component';
import { StudentAssignmentPage } from '../studentAssignmentPage';
import { DisplayedFile } from '../displayedFile';

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

  assignment : StudentAssignmentPage;

  displayAssignment : boolean;

  displayFileDrop : boolean;

  currentUser : AuthedUserService;

  homework : Homework;

  constructor(currentUser : AuthedUserService){
    this.selectedClass = String(this.route.snapshot.params['selectedClass']);

    this.assignment = new StudentAssignmentPage;

    this.assignment.file = new DisplayedFile("-1", "None");
    this.displayAssignment = false;

    this.currentUser = currentUser;

    this.displayFileDrop = false;

  }

  public async ngOnInit(){
    
    this.assignmentID = String(this.route.snapshot.queryParamMap.get('assignmentId'));


    this.currentUser.getStudentAssignment(this.assignmentID).subscribe({
      next: (response)=>{
        this.assignment = response;
        this.assignment.available_date = this.formatDateObject(response.available_date);
        this.assignment.due_date = this.formatDateObject(response.due_date);
        this.assignment.close_date = this.formatDateObject(response.close_date);

        var closeDate = new Date(Date.parse(this.assignment.close_date.substring(0, this.assignment.close_date.length-6)));
        var currentDate = new Date();

        if(currentDate < closeDate){
          this.displayFileDrop = true;
        }

        if(!response['handed_work_files']){
          this.assignment.handed_work_files = [];
        }

        if(!response['corrected_work_files']){
          this.assignment.corrected_work_files = [];
        }

        if(response['file']){
          if(response.file.file_name != undefined){
            this.assignment.file = new DisplayedFile(response.file.id_file, response.file.file_name);
            this.displayAssignment = true;
          }
        }

      },
      error: (err)=>{
        console.log(err);
      }

    });



  }

  formatDateObject(toFormat : string){
    var newDate = Date.parse(toFormat.substring(0, toFormat.length-6));
    return formatDate(newDate, 'yyyy-MM-dd HH:mm', 'en_us');
  }

  handInAssignment(content : Blob){
    this.currentUser.handInFile(this.assignmentID, content).subscribe({
      next:(resposne)=>{
        //COOL
      },
      error:(err)=>{
        console.log(err);
      }


    });
  }

}
