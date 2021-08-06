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
  isShow: boolean = false;
  constructor(public service: SharedServiceService, public util: UtilService, private router: Router) {
    this.classId = localStorage.getItem('classListId');
  }

  ngOnInit() {
  }

  cancel(){
    this.router.navigate(['/test/test-listing-home']);
  }

  setTimer(event) {
    console.log('event', event.target.checked);
    if (event.target.checked == true) {
      this.isShow = true
    }
    else {
      this.isShow = false;
    }
  }

  goToTestHome() {
    this.router.navigate(['/test/test-listing-home']);
  }

  goToTestAssessment() {
    this.router.navigate(['/test/test-assessment']);
  }

  // confirm add test
  confirm() {
    console.log('this.SettingsData',this.SettingsData);
    if(this.SettingsData.test_name=='' || this.SettingsData.instruction=='' || this.SettingsData.test_available_from=='' || this.SettingsData.test_available_to==''){
        this.util.errorAlertPopup('Please enter all values first');
    }

    else{
      this.SettingsData.timer = (this.SettingsData.timer == true) ? "Yes" : "No"
      this.SettingsData.class_nid = this.classId;
      var x = new Date(this.SettingsData.test_available_from);
      var y = new Date(this.SettingsData.test_available_to);
  
      if (x > y) {
        this.util.errorAlertPopup('start date should be less than end date');
      }
      else {
        this.isLoadingBool = true;
        this.service.post('add-test-api', this.SettingsData, 1).subscribe(result => {
  
          if (result.status == '1') {
            this.isLoadingBool = false;
            this.util.showSuccessAlert('Test added successfully');
            this.router.navigate(['/test/test-listing-home']);
          }
        })
      }
    }
  
  }

}
