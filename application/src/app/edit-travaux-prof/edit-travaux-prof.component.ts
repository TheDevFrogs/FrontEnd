import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DropBoxComponent } from '../drop-box/drop-box.component';
import { AuthedUserService } from '../authed-user.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';


@Component({
  selector: 'app-edit-travaux-prof',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, DropBoxComponent, OwlDateTimeModule, OwlNativeDateTimeModule],
  templateUrl: './edit-travaux-prof.component.html',
  styleUrls: ['./edit-travaux-prof.component.css']
})
export class EditTravauxProfComponent {

  currentUser : AuthedUserService;

  constructor (private diaglogRef : MatDialog, user : AuthedUserService){
    this.currentUser = user;

  }
  

  openDialog(){
    this.diaglogRef.open(PopUpComponent);
  }


  enregistrer(){
    //Obtenir l'information



    //Verifier que l'info est ok sinon popup


    //Requete post

    




  }

}
