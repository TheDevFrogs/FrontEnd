import { Routes } from '@angular/router'
import { CoursComponent } from './cours/cours.component';


var routeConfig: Routes = [
    {
        path: 'session/:selectedOne',
        component: CoursComponent,
        title: 'Session'
    },

    {
        path: 'enseignement/:selectedOne',
        component: CoursComponent,
        title: 'Session'
    }



];


export default routeConfig;