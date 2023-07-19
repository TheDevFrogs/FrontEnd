import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthedUserService } from '../authed-user.service';
import { TeacherClass } from '../TeacherClass';
import { Teacher } from '../teacher';
import { TeacherAssignmentPreview } from '../teacherAssingmentPreview';
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

  classList : TeacherClass[];
  
  currentUser : AuthedUserService;
  
  constructor(currentUser : AuthedUserService, router : Router){
    this.currentUser = currentUser;

    this.router = router;

    this.router.events.subscribe((event)=>{
        this.ngOnInit();
      }
    );

    this.classList = [];

  }

  public async ngOnInit(){
    var refresh = refresh = Boolean(this.route.snapshot.queryParamMap.get('refresh'));

    if(this.router.url === this.currentFullRoute && !refresh){
      return;
    }

    console.log("Update");

    var newClassList : TeacherClass[];
    newClassList = [];

    this.currentFullRoute = this.router.url;

    this.sessionID = String(this.route.snapshot.queryParamMap.get('sessionId'));

    this.currentUser.getClasses(this.sessionID, "teacher").subscribe({
      next:(response)=>{

        for(let i = 0; i < response.length; i++){
          
          var teachers  : Teacher[];
          var assignments : TeacherAssignmentPreview[];
          teachers = [];
          assignments = [];

          for(let j = 0; j < response[i].teachers.length; j++){
            teachers.push(new Teacher(response[i].teachers[j].cip, response[i].teachers[j].first_name, response[i].teachers[j].last_name));
          }

          for(let j = 0; j < response[i].assigments.length; j++){
            assignments.push(new TeacherAssignmentPreview(response[i].assigments[j].id_assignment, response[i].assigments[j].due_date, response[i].assigments[j].name));
          }


          newClassList.push(new TeacherClass(response[i].id_group, response[i].name, response[i].classTag, response[i].no_group, teachers, assignments));
        }

        this.classList = newClassList;

      },
      error:(err)=>{
        console.log(err);
      }


    });

  }

  formatDateObject(toFormat : string){
    var newDate = Date.parse(toFormat.substring(0, toFormat.length-6));
    return formatDate(newDate, 'yyyy-MM-dd HH:mm', 'en_us');
  }


}
