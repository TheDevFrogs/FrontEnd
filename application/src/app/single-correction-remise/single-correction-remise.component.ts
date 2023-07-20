import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropBoxComponent } from '../drop-box/drop-box.component';
import { AuthedUserService } from '../authed-user.service';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-single-correction-remise',
  standalone: true,
  imports: [CommonModule, DropBoxComponent, MatFormFieldModule, MatSelectModule],
  templateUrl: './single-correction-remise.component.html',
  styleUrls: ['./single-correction-remise.component.css']
})
export class SingleCorrectionRemiseComponent {

  route : ActivatedRoute = inject(ActivatedRoute);

  selected;

  teams : string[];

  assignmentName : string;

  constructor(private currentUser : AuthedUserService){

    this.teams = [];
    this.teams.push("1");
    this.teams.push("2");
    this.teams.push("3");
    this.teams.push("4");
    this.teams.push("5");
    this.teams.push("6");
    this.teams.push("7");

  }

  public async ngOnInit(){
    this.assignmentName = String(this.route.snapshot.queryParamMap.get('assignmentName'));
  }

  fileSaved(toSave : Blob){
    console.log(toSave);
  }


}
