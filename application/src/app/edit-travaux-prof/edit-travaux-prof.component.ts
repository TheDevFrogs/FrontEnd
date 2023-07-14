import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';



@Component({
  selector: 'app-edit-travaux-prof',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-travaux-prof.component.html',
  styleUrls: ['./edit-travaux-prof.component.css']
})
export class EditTravauxProfComponent {

  constructor (private diaglogRef : MatDialog){}
  

  openDialog(){
    this.diaglogRef.open(PopUpComponent);
  }


}
