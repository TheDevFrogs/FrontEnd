import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
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

  showError = false;

  route: ActivatedRoute = inject(ActivatedRoute);

  editForm = new FormGroup({
    nom : new FormControl(''),
    dateLimite : new FormControl(),
    dateOuverture : new FormControl(),
    dateFermeture : new FormControl(),
    description : new FormControl('')
  });
  
  zippedFile : Blob;

  group_id : string;
  eddition : boolean;
  assingmentId : string;

  constructor (private diaglogRef : MatDialog, user : AuthedUserService, private router: Router){
    this.currentUser = user;
    this.zippedFile = new Blob;

  }

  public async ngOnInit(){


    this.group_id = String(this.route.snapshot.queryParamMap.get('groupId'));
    this.eddition = this.route.snapshot.queryParamMap.get('editing') === 'true';
    this.assingmentId = String(this.route.snapshot.queryParamMap.get('assignmentId'));
  

    if(this.eddition){
      this.currentUser.getTeacherAssignment(this.assingmentId).subscribe({
        next:(response)=>{

          this.editForm.controls["nom"].setValue(response.name);
          this.editForm.controls["dateLimite"].setValue(this.getDateFromString(response.due_date));
          this.editForm.controls["dateOuverture"].setValue(this.getDateFromString(response.available_date));
          this.editForm.controls["dateFermeture"].setValue(this.getDateFromString(response.close_date));
          this.editForm.controls["description"].setValue(response.description);


        },
        error:(err)=>{
          console.log(err);
        }
      });
    }


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
           this.editForm.value.dateLimite <= this.editForm.value.dateFermeture;
  }

  supprimer(){
    console.log("SUPRIMER");
    this.currentUser.delete(this.assingmentId).subscribe({
      next:(reponse)=>{
      },
      error:(err)=>{
       console.log(err);
      }
    });
  }

  enregistrer(){
    //Verifier que l'info est ok sinon popup
    if(!this.verifyInfo()){
      //Afficher in popup
      console.log("Donnes invalides");
      this.showError = true;
      return;
    }

    this.currentUser.createAssignment(this.group_id,
                                      this.editForm.value.nom as string, 
                                      this.editForm.value.description as string, 
                                      formatDate(this.editForm.value.dateLimite, 'yyyy-MM-dd HH:mm', 'en_us', '+0400'),
                                      formatDate(this.editForm.value.dateFermeture, 'yyyy-MM-dd HH:mm', 'en_us', '+0400'), 
                                      formatDate(this.editForm.value.dateOuverture, 'yyyy-MM-dd HH:mm', 'en_us', '+0400'), 
                                      this.zippedFile).subscribe(
    {
      next:(response)=>{
        var urlSplit = this.router.url.split('/');
        this.router.navigate(
          [urlSplit[1] + "/" + urlSplit[2]],
          { queryParams: { refresh: true},
            queryParamsHandling: 'merge' },
        );
      }
    
    });
  }

  updateAssignment(){
    //Verifier que l'info est ok sinon popup
    if(!this.verifyInfo()){
      //Afficher in popup
      this.showError = true;
      console.log("Donnes invalides");
      return;
    }

    this.currentUser.updateAssignment(this.assingmentId,
                                      this.editForm.value.nom as string, 
                                      this.editForm.value.description as string, 
                                      formatDate(this.editForm.value.dateLimite, 'yyyy-MM-dd HH:mm', 'en_us', '+0400'),
                                      formatDate(this.editForm.value.dateFermeture, 'yyyy-MM-dd HH:mm', 'en_us', '+0400'), 
                                      formatDate(this.editForm.value.dateOuverture, 'yyyy-MM-dd HH:mm', 'en_us', '+0400'), 
                                      this.zippedFile).subscribe(
    {
      next:(response)=>{
        var urlSplit = this.router.url.split('/');
        this.router.navigate(
          [urlSplit[1] + "/" + urlSplit[2]],
          { queryParams: { refresh: true},
            queryParamsHandling: 'merge' },
        );
      }
    
    });
  }

  getDateFromString(toFormat : string){
    var newDate = Date.parse(toFormat.substring(0, toFormat.length-6));
    return new Date(newDate);
  }

}
