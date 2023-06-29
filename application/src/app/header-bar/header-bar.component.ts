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
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }
}


