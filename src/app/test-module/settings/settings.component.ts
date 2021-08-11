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
    test_available_to: '',
    timer: '',
    timer_time: '',
    attempts: '',
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

  cancel() {
    this.router.navigate(['/test/test-listing-home']);
  }

  setTimer(event) {

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

    if (this.SettingsData.test_name == '' || this.SettingsData.instruction == '' || this.SettingsData.test_available_from == '' || this.SettingsData.test_available_to == '') {
      this.util.errorAlertPopup('Please enter all values first');
    }


    else {

      this.SettingsData.timer = (this.SettingsData.timer == true) ? "Yes" : "No"
      this.SettingsData.class_nid = this.classId;
      var x = new Date(this.SettingsData.test_available_from);
      var y = new Date(this.SettingsData.test_available_to);

      if (x > y) {
        this.util.errorAlertPopup('start date should be less than end date');
      }
      else {
        var date = String(this.SettingsData.test_available_from + " " + this.SettingsData.test_availble_from_time)
        var fromData = String(this.SettingsData.test_available_to + " " + this.SettingsData.test_availble_to_time)

        let params = {
          test_name: this.SettingsData.test_name,
          instruction: this.SettingsData.instruction,
          test_available_from: date,
          test_available_to: fromData,
          test_availble_from_time:this.SettingsData.test_availble_from_time,
          test_availble_to_time:this.SettingsData.test_availble_to_time,
          timer: this.SettingsData.timer,
          timer_time: this.SettingsData.timer_time,
          attempts: this.SettingsData.attempts,
          pagination: this.SettingsData.pagination,
          view_ans_after_compliation: this.SettingsData.view_ans_after_compliation,
          class_nid:this.classId,
          attempt_type:this.SettingsData.attempts_score
        }

        console.log('this.settingData', params)
        this.isLoadingBool = true;
        this.service.post('add-test-api',params, 1).subscribe(result => {
          console.log('res', result);
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
