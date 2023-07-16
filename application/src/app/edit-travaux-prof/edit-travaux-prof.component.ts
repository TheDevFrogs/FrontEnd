import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DropBoxComponent } from '../drop-box/drop-box.component';
import { AuthedUserService } from '../authed-user.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { formatDate} from '@angular/common';


@Component({
  selector: 'app-edit-travaux-prof',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, DropBoxComponent, OwlDateTimeModule, OwlNativeDateTimeModule, ReactiveFormsModule],
  templateUrl: './edit-travaux-prof.component.html',
  styleUrls: ['./edit-travaux-prof.component.css']
})
export class EditTravauxProfComponent {

  currentUser : AuthedUserService;

  editForm = new FormGroup({
    nom : new FormControl(''),
    dateLimite : new FormControl(),
    dateOuverture : new FormControl(),
    dateFermeture : new FormControl(),
    description : new FormControl('')
  });
  
  zippedFile : Blob;


  constructor (private diaglogRef : MatDialog, user : AuthedUserService){
    this.currentUser = user;

  }
  

  openDialog(){
    this.diaglogRef.open(PopUpComponent);
  }

  public fileChanged(content : Blob){
    this.zippedFile = content;
  }

  verifyInfo(){
    return this.editForm.value.nom !== "" && 
           this.editForm.value.description !== "" &&
           this.editForm.value.dateFermeture > this.editForm.value.dateOuverture &&
           this.editForm.value.dateLimite > this.editForm.value.dateOuverture &&
           this.editForm.value.dateLimite < this.editForm.value.dateFermeture;
  }

  enregistrer(){
    //Obtenir l'information

    if(!this.verifyInfo()){
      //Afficher in popup
      console.log("Donnes invalides");
      return;
    }

    //Verifier que l'info est ok sinon popup

    console.log(formatDate(this.editForm.value.dateFermeture, 'yyyy-MM-dd HH:mm', 'en_us'));

    //Requete post
    this.currentUser.createAssignment(this.editForm.value.nom as string, 
                                      this.editForm.value.description as string, 
                                      formatDate(this.editForm.value.dateLimite, 'yyyy-MM-dd HH:mm', 'en_us'),
                                      formatDate(this.editForm.value.dateFermeture, 'yyyy-MM-dd HH:mm', 'en_us'), 
                                      formatDate(this.editForm.value.dateOuverture, 'yyyy-MM-dd HH:mm', 'en_us'), 
                                      this.zippedFile).subscribe(
    {
      next:(response)=>{
        console.log("OUI");
        console.log(response);
      }
    
    });

    console.log("OK?");




  }

}
