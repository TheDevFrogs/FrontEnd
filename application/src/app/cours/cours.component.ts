import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: `./cours.component.html`,
  styleUrls: ['./cours.component.css']
})
export class CoursComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  selectedSession = 'none';
  constructor(){
    this.selectedSession = String(this.route.snapshot.params['selectedSession']);
  }
}
