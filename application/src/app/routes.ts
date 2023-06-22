import { Routes } from '@angular/router'
import { CoursComponent } from './cours/cours.component';
import { ConsultationTravauxComponent } from './consultation-travaux/consultation-travaux.component';


var routeConfig: Routes = [
    {
        path: 'session/:selectedSession',
        component: CoursComponent,
        title: 'Session'
    },

    {
        path: 'enseignement/:selectedSession',
        component: CoursComponent,
        title: 'Session'
    },

    {
        path: 'session/:selectedSession/:selectedCours',
        component: ConsultationTravauxComponent,
        title: 'Session'
    }



];


export default routeConfig;