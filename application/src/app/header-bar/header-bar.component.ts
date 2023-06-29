import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-header-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./header-bar.component.html`,
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit{

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(private readonly keycloak: KeycloakService) {}

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    console.log(this.isLoggedIn);
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
    else{
      console.log("not logged in")
    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }
}


