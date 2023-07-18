import { Homework } from './../homework';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthedUserService } from '../authed-user.service';
import { Cours } from '../cours';
import { Teacher } from '../teacher';


@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: `./cours.component.html`,
  styleUrls: ['./cours.component.css']
})
export class CoursComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router : Router;

  currentFullRoute = "none";

  selectedSession = 'none';
  sessionID = "-1";
  
  classList : Cours[];

  currentUser: AuthedUserService;

  constructor(currentUser: AuthedUserService, router : Router){
    this.currentUser = currentUser;

    this.router = router;

    this.router.events.subscribe({
      next:()=>{
        this.ngOnInit();
      }
    });

    this.classList = [];
  }

  public async ngOnInit(){

    if(this.router.url === this.currentFullRoute){
      return;
    }

    var newClassList : Cours[];

    newClassList = [];

    this.currentFullRoute = this.router.url;

    this.selectedSession = String(this.route.snapshot.params['selectedSession']);
    this.sessionID = String(this.route.snapshot.queryParamMap.get('sessionId'));



    this.currentUser.getClasses(this.sessionID, "student").subscribe({
      next:(response)=>{

        for(let i = 0; i < response.length; i++){
          var homeworks : Homework[];
          var teachers : Teacher[];
          homeworks = [];
          teachers = []

          if(response[i].assigments != null){
            for(let j = 0; j < response[i].assigments.length; j++){
              homeworks.push(new Homework(response[i].assigments[j].name, this.getIcon(response[i].assigments[j].status), response[i].assigments[j].name, response[i].assigments[j].id_assignment));
            }
          }

          if(response[i].teachers != null){
            for(let j = 0; j < response[i].teachers.length; j++){
              teachers.push(new Teacher(response[i].teachers[j].cip, response[i].teachers[j].first_name, response[i].teachers[j].last_name));
            }
          }

          newClassList.push(new Cours(response[i].name, response[i].classTag, teachers, homeworks))

        }

        this.classList = newClassList;
      },
      error:(err)=>{
        console.log(err);
      }


    });

  }

  getIcon(assingmentStatus : string){
      if(assingmentStatus === "scheduled"){
        return "event";
      }
      else if(assingmentStatus === "todo"){
        return "hourglass_empty";
      }
      else if(assingmentStatus === "handed"){
        return "check_circle";
      }
      else if(assingmentStatus === "late"){
        return "error";
      }
      else{
        return "cancel";
      }

  }


}
