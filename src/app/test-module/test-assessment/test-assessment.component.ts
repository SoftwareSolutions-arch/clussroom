import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-assessment',
  templateUrl: './test-assessment.component.html',
  styleUrls: ['./test-assessment.component.css']
})
export class TestAssessmentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToTestHome() {
    this.router.navigate(['/test/test-listing-home']);
  }

  settingsClicked() {
    this.router.navigate(["/test/settings-tabs"]);
  }

}
