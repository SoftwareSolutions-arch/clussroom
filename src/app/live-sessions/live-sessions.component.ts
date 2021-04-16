import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-live-sessions',
  templateUrl: './live-sessions.component.html',
  styleUrls: ['./live-sessions.component.css']
})
export class LiveSessionsComponent implements OnInit {
  instructionName: any = '';

  constructor(public router: Router) {
    this.instructionName = localStorage.getItem('instructionName');
   }

  ngOnInit(): void {
  }

  goToClassList() {
    this.router.navigate(['/classes-list'])
  }

  goToLearner() {
    this.router.navigate(['/learners']);
  }

  goToStroage() {
    this.router.navigate(['/storage']);
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }

  goToCourses() {
    this.router.navigate(['/sample04']);
  }

  goToclasses() {
    this.router.navigate(['/classes']);
  }


}
