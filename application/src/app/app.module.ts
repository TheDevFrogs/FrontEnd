import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainViewComponent } from './main-view/main-view.component';
import { AuthedUserService } from './authed-user.service';
import { AppRoutingModule } from './app-routing.modules';
import { CoursProfComponent } from './cours-prof/cours-prof.component';
import { EditTravauxProfComponent } from './edit-travaux-prof/edit-travaux-prof.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LogoutButtonComponent } from './logout-button/logout-button.component';

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
  imports: [BrowserModule, KeycloakAngularModule, HeaderBarComponent, SideBarComponent, MainViewComponent, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, AuthedUserService]
    },
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
