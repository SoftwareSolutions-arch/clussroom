import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  isLoadingBool: boolean = false;
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

  classId: any = '';
  constructor(public service: SharedServiceService, public util: UtilService, private router: Router) {
    this.classId = localStorage.getItem('classListId');
    console.log('this.classId', this.classId)
  }

  ngOnInit() {
  }

  goToTestHome() {
    this.router.navigate(['/test-listing-home']);
  }

  goToTestAssessment() {
    this.router.navigate(['/test-assessment']);
  }

  // confirm add test
  confirm() {
    this.isLoadingBool = true;

    this.SettingsData.class_nid = this.classId;
    var x = new Date(this.SettingsData.test_available_from);
    var y = new Date(this.SettingsData.test_available_to);

    if (x > y) {
      this.util.errorAlertPopup('start date should be less than end date');
    }
    else {
      this.isLoadingBool = true;
      this.service.post('add-test-api', this.SettingsData, 1).subscribe(result => {
        console.log('result',result)
        if(result.status=='1'){
          this.isLoadingBool = false;
          this.util.showSuccessAlert('Test added successfully');
        }
      })
    }
  }

}
