import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent {

  keycloak : KeycloakService;

  constructor(keycloak : KeycloakService){
    this.keycloak = keycloak;
  }

  logout(){
    console.log(this.keycloak.isLoggedIn());
    this.keycloak.logout();
  }

}
