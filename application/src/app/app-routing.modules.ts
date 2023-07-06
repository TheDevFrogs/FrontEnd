import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursComponent } from './cours/cours.component';
import { ConsultationTravauxComponent } from './consultation-travaux/consultation-travaux.component';



var routes: Routes = [
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
      path: 'session/:selectedSession/:selectedClass',
      component: ConsultationTravauxComponent,
      title: 'Session'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
