import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AuthentificationService } from './authentification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
  ],
  template: `
    <app-home></app-home>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Page';



  constructor (auth : AuthentificationService){
    auth.authenticate();
  }


}