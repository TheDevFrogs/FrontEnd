import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainViewComponent } from './main-view/main-view.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8180/',
        realm: 'usager',
        clientId: 'frontend'
      }, 
      initOptions: {
        onLoad: 'login-required'}
    });
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, KeycloakAngularModule, HeaderBarComponent, SideBarComponent, MainViewComponent ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
