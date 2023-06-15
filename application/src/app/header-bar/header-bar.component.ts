import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthedUserService } from '../authed-user.service';

@Component({
  selector: 'app-header-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./header-bar.component.html`,
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent {
    currentUserFullName: string;

    constructor(currentUser : AuthedUserService){
      this.currentUserFullName = currentUser.getUserFullName();
    }

}


