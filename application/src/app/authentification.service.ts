import { KeycloakOptions } from './../../node_modules/keycloak-angular/lib/core/interfaces/keycloak-options.d';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  keycloak: KeycloakService;


  constructor() { 
    this.keycloak = new KeycloakService();

  }


  authenticate() {
    this.keycloak.init({
      config: {
        url: 'http://localhost:8180/',
        realm: 'usager',
        clientId: 'frontend',
        
      },
      loadUserProfileAtStartUp: true,
      initOptions: {
        onLoad: 'login-required',
        silentCheckSsoRedirectUri: window.location.origin,
      }
    });

    return this.keycloak;
}
  
}
