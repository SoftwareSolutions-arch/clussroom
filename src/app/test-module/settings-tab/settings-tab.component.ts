import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.component.html',
  styleUrls: ['./settings-tab.component.scss']
})
export class SettingsTabComponent implements OnInit {
  SettingsData: any = {
    test_name: '',
    instruction: '',
    test_available_from: '',
    // test_availble_from_time: '',
    test_available_to: '',
    // test_availble_to_time: '',
    timer: '',
    timer_time: '',
    attempts: '',
    // attempts_score: '',
    pagination: '',
    view_ans_after_compliation: '',
    class_nid: ''
  }
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToTestHome(){
    this.router.navigate(['/test/test-listing-home']);
  }

  goToTestAssessment(){
    this.router.navigate(['/test/test-assessment']);
  }

}
