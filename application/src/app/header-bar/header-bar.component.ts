import { AuthedUserService } from './../authed-user.service';
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

  public userName : string;
  private acces: AuthedUserService;

  constructor(private readonly keycloak: KeycloakService, acces: AuthedUserService) {
    this.acces = acces;
    this.userName = "Loading...";
  }

  public async ngOnInit() {
    this.acces.getUserFullName().subscribe({
      next: (response)=>{
        this.userName = response.firstName + " " + response.lastName;
      },
      error: (error)=>{
        console.error(error);
      }
      
    }
    );
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }
}


