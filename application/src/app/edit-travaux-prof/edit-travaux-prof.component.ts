import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';



@Component({
  selector: 'app-edit-travaux-prof',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatFormFieldModule],
  templateUrl: './edit-travaux-prof.component.html',
  styleUrls: ['./edit-travaux-prof.component.css']
})
export class EditTravauxProfComponent {

  constructor (private diaglogRef : MatDialog){}
  

  openDialog(){
    this.diaglogRef.open(PopUpComponent);
  }


}
