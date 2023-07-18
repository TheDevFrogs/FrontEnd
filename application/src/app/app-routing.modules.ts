import { EditTravauxProfComponent } from './edit-travaux-prof/edit-travaux-prof.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursComponent } from './cours/cours.component';
import { ConsultationTravauxComponent } from './consultation-travaux/consultation-travaux.component';
import { CoursProfComponent } from './cours-prof/cours-prof.component';



var routes: Routes = [
  {
    path: 'session/:selectedSession/:selectedClass',
    component: ConsultationTravauxComponent,
    title: 'Remise de travaux'
  },
  {
      path: 'session/:selectedSession',
      component: CoursComponent,
      title: 'Remise de travaux'
  },

  {
      path: 'enseignement/:selectedSession',
      component: CoursProfComponent,
      title: 'Remise de travaux'
  },
  {
      path: 'enseignement/:selectedSession/nouvelleRemise',
      component: EditTravauxProfComponent,
      title : 'Remise de travaux'
  },
  {
    path: 'enseignement/:selectedSession/modifier',
    component: EditTravauxProfComponent,
    title : 'Remise de travaux'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
