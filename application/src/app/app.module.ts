import { MatDatepickerModule } from '@angular/material/datepicker';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainViewComponent } from './main-view/main-view.component';
import { AuthedUserService } from './authed-user.service';
import { AppRoutingModule } from './app-routing.modules';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



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
  imports: [
    BrowserModule, 
    KeycloakAngularModule, 
    HeaderBarComponent, 
    SideBarComponent, 
    MainViewComponent, 
    AppRoutingModule, 
    HttpClientModule,
    NgxFileDropModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule
    ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, AuthedUserService]
    },
    HttpClient
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
