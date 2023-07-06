import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { AuthedUserService } from '../authed-user.service';
import { Cours } from './cours';
import { Homework } from '../homework';


@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: `./cours.component.html`,
  styleUrls: ['./cours.component.css']
})
export class CoursComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  selectedSession = 'none';
  semester = false;

  classList : Cours[];

  currentUser: AuthedUserService;

  constructor(currentUser: AuthedUserService){
    this.currentUser = currentUser;

    this.classList = [];

    this.classList.push(new Cours("Mathématique", "GIF333", "Fred", [new Homework("Analyse", "check_circle", "Some"), new Homework("Mathematique", "check_circle", "Mathematique")]));
    this.classList.push(new Cours("Securite", "GI334", "Maurice", [new Homework("Analyse", "check_circle", "Some"), new Homework("Mathematique", "check_circle", "Mathematique")]));
    this.classList.push(new Cours("APP3", "GI234", "Roger", [new Homework("Analyse", "check_circle", "Some"), new Homework("Mathematique", "check_circle", "Math encore")]));
  }

  public async ngOnInit(){

    this.selectedSession = String(this.route.snapshot.params['selectedSession']);
    this.semester = this.route.snapshot.url[0].path === "session";

    this.currentUser.getClasses(this.route.snapshot.url[0].path).subscribe({
      next:(response)=>{
        if(this.semester){

         
        }
        else{
    
        }
      },
      error:(err)=>{
        console.log(err);
      }


    });

  }




}
