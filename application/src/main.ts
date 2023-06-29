/*
*  Protractor support is deprecated in Angular.
*  Protractor is used in this example for compatibility with Angular documentation tools.
*/
import { bootstrapApplication,provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import { AuthedUserService } from './app/authed-user.service';
import { AuthentificationService } from './app/authentification.service';
import { HttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent,
    {providers: [
      HttpClient,
      provideProtractorTestingSupport(),
      provideRouter(routeConfig)
    ]})
  .catch(err => console.error(err));
