import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegendeComponent } from '../legende/legende.component';
import { SideBarContentComponent } from '../side-bar-content/side-bar-content.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, LegendeComponent, SideBarContentComponent, LogoutButtonComponent],
  templateUrl: `./side-bar.component.html`,
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

}
