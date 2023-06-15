import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursComponent } from '../cours/cours.component';
import { ConsultationTravauxComponent } from '../consultation-travaux/consultation-travaux.component';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CommonModule, CoursComponent, ConsultationTravauxComponent],
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
