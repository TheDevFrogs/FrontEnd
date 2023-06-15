import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { MainViewComponent } from '../main-view/main-view.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SideBarComponent, HeaderBarComponent, MainViewComponent],
  template: `
    <app-header-bar></app-header-bar>
    <app-side-bar></app-side-bar>
    <app-main-view></app-main-view>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
