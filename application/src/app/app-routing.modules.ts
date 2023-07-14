import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursComponent } from './cours/cours.component';
import { ConsultationTravauxComponent } from './consultation-travaux/consultation-travaux.component';



var routes: Routes = [
  {
    path: 'session/:sessionID/:selectedSession/:selectedClass',
    component: ConsultationTravauxComponent,
    title: 'Remise de travaux'
  },
  {
      path: 'session/:sessionID/:selectedSession',
      component: CoursComponent,
      title: 'Remise de travaux'
  },

  {
      path: 'enseignement/:sessionID/:selectedSession',
      component: CoursComponent,
      title: 'Remise de travaux'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
