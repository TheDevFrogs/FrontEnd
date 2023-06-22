import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./cours.component.html`,
  styleUrls: ['./cours.component.css']
})
export class CoursComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  selectedOne = 'none';
  constructor(){
    this.selectedOne = String(this.route.snapshot.params['selectedOne']);
  }
}
