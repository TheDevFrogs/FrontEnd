import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthedUserService } from '../authed-user.service';



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
  
  classList;

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

    this.currentFullRoute = this.router.url;

    this.selectedSession = String(this.route.snapshot.params['selectedSession']);
    this.sessionID = String(this.route.snapshot.queryParamMap.get('sessionId'));



    this.currentUser.getClasses(this.sessionID, "student").subscribe({
      next:(response)=>{

        this.classList = response;
      },
      error:(err)=>{
        console.log(err);
      }


    });

  }

  public getIcon(assingmentStatus : string){
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
