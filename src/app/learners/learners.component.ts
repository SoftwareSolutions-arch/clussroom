import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-learners',
  templateUrl: './learners.component.html',
  styleUrls: ['./learners.component.css']
})
export class LearnersComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  // navigate to courses tab
  goToCourses() {
    this.router.navigate(['/sample04']);
  }

  goToclasses() {
    this.router.navigate(['/classes']);
  }

  goToClassList() {
    this.router.navigate(['/classes-list'])
  }

}
