import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
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
        this.assignment = response;

        if(response.file.id_file != 0){
          this.displayAssignment = true;
        }
        
        var currentDate = new Date();

        if(currentDate < new Date(Date.parse(response.close_date.substring(0, response.close_date.length-6)))){
          this.displayFileDrop = true;
        }

      },
      error: (err)=>{
        console.log(err);
      }

    });



  }

  formatDateObject(toFormat : string){
    var newDate = Date.parse(toFormat.substring(0, toFormat.length-6));
    return formatDate(newDate, 'yyyy-MM-dd HH:mm', 'en_us', '+0400');
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

  downloadTeacherFiles(id_file : string){
    this.currentUser.downloadTeacherAssignmentFile(id_file).subscribe({
      next:(response)=>{
        var file = require("file-saver");
        file.saveAs(response, "assignmentFile.zip");
      }
  });
  }

  downloadTeacherCorrection(id_file : string, fileName : string){
    this.currentUser.downloadTeacherCorrectionFile(id_file).subscribe({
      next:(response)=>{
        var file = require("file-saver");
        file.saveAs(response, fileName);
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


