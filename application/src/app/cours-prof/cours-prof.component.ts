import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthedUserService } from '../authed-user.service';
import { formatDate} from '@angular/common';

@Component({
  selector: 'app-cours-prof',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './cours-prof.component.html',
  styleUrls: ['./cours-prof.component.css']
})
export class CoursProfComponent {
  route : ActivatedRoute = inject(ActivatedRoute);
  router : Router;

  currentFullRoute = "none";

  sessionID = "-1";
  selectedSession = 'none';

  classList;
  
  currentUser : AuthedUserService;
  
  constructor(currentUser : AuthedUserService, router : Router){
    this.currentUser = currentUser;

    this.router = router;

    this.router.events.subscribe((event)=>{
        this.ngOnInit();
      }
    );

  }

  public async ngOnInit(){
    var refresh = refresh = Boolean(this.route.snapshot.queryParamMap.get('refresh'));

    if(this.router.url === this.currentFullRoute && !refresh){
      return;
    }

    this.currentFullRoute = this.router.url;

    this.sessionID = String(this.route.snapshot.queryParamMap.get('sessionId'));

    this.currentUser.getClasses(this.sessionID, "teacher").subscribe({
      next:(response)=>{

        this.classList = response;

      },
      error:(err)=>{
        console.log(err);
      }


    });

  }

  formatDateObject(toFormat : string){
    var newDate = Date.parse(toFormat.substring(0, toFormat.length-6));
    return formatDate(newDate, 'yyyy-MM-dd HH:mm', 'en_us', '+0400');
  }


}
