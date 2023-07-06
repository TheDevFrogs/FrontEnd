import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursComponent } from '../cours/cours.component';
import { ConsultationTravauxComponent } from '../consultation-travaux/consultation-travaux.component';
import { CoursProfComponent } from '../cours-prof/cours-prof.component';
import { EditTravauxProfComponent } from '../edit-travaux-prof/edit-travaux-prof.component';
import { CorrectionRemiseComponent } from '../correction-remise/correction-remise.component';
import { HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CommonModule, 
            CoursComponent, 
            CoursProfComponent, 
            ConsultationTravauxComponent, 
            RouterModule, 
            EditTravauxProfComponent, 
            CorrectionRemiseComponent
          ],
  templateUrl: `./main-view.component.html`,
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent {

  public getScreenWidth: any;
  public getScreenHeight: any;

  ngOnInit() {
      this.getScreenWidth = window.innerWidth;
      this.getScreenHeight = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

}
