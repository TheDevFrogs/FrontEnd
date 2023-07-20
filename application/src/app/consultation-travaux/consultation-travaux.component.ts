import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthedUserService } from '../authed-user.service';
import { DropBoxComponent } from '../drop-box/drop-box.component';
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

  @ViewChild(DropBoxComponent)
  private dropBox!: DropBoxComponent;

  selectedClass : string;
  assignmentID : string;

  displayAssignment : boolean;

  displayFileDrop : boolean;

  currentUser : AuthedUserService;

  assignment;

  constructor(currentUser : AuthedUserService, private router: Router){
    this.selectedClass = String(this.route.snapshot.params['selectedClass']);

    this.displayAssignment = false;

    this.currentUser = currentUser;

    this.displayFileDrop = false;

  }

  public async ngOnInit(){
    
    this.assignmentID = String(this.route.snapshot.queryParamMap.get('assignmentId'));


    this.currentUser.getStudentAssignment(this.assignmentID).subscribe({
      next: (response)=>{
        console.log(response);
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

        if(response.file.id_file != 0){
          this.displayAssignment = true;
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
        this.ngOnInit();
        this.dropBox.cancel();
        //Popup pour le user
      },
      error:(err)=>{
        console.log(err);
      }


    });
  }


  downloadHandedIn(id_file : string, fileName : string){
    this.currentUser.downloadAssignmentFile(id_file).subscribe({
      next:(response)=>{
        var file = require("file-saver");
        file.saveAs(response, fileName + ".zip");
      }
  });
  }

}


