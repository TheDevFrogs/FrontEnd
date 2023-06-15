import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegendeComponent } from '../legende/legende.component';
import { SideBarContentComponent } from '../side-bar-content/side-bar-content.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, LegendeComponent, SideBarContentComponent],
  templateUrl: `./side-bar.component.html`,
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

}
