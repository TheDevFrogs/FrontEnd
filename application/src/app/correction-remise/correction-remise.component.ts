import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropBoxComponent } from '../drop-box/drop-box.component';
import { AuthedUserService } from '../authed-user.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-correction-remise',
  standalone: true,
  imports: [CommonModule, DropBoxComponent],
  templateUrl: './correction-remise.component.html',
  styleUrls: ['./correction-remise.component.css']
})
export class CorrectionRemiseComponent {

  @ViewChild(DropBoxComponent)
  private dropBox!: DropBoxComponent;

  route : ActivatedRoute = inject(ActivatedRoute);

  assignmentName : string;

  assignmentId : string;

  constructor(private currentUser: AuthedUserService, ){

  }


  public async ngOnInit(){
    this.assignmentName = String(this.route.snapshot.queryParamMap.get('assignmentName'));
    this.assignmentId = String(this.route.snapshot.queryParamMap.get('assignmentId'));
    



  }

  public fileSaved(toSend: Blob){
    this.currentUser.handCorrection(this.assignmentId, toSend).subscribe({
      next:(response)=>{
        //COOL
        this.dropBox.cancel();
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  public downloadAll(){
    this.currentUser.downloadAllHanded(this.assignmentId).subscribe({
      next:(response)=>{
        var file = require('file-saver');
        file.saveAs(response, "remises.zip");
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }



}
