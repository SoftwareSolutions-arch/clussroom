import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { time } from 'console';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.component.html',
  styleUrls: ['./settings-tab.component.scss']
})
export class SettingsTabComponent implements OnInit {
  isClicked: boolean = true;
  SettingsData: any = {
    test_name: '',
    instruction: '',
    start_date: '',
    end_time: '',
    timer: '',
    timer_time: '',
    attempts: '',
    pagination: '',
    view_ans_after_compliation: '',
    start_time: '',
    end_date: '',
    attempts_score: ''
  }
  selectedTestDetails: any = "";
  allData: any = [];
  isLoadingBool: boolean = true;
  classId: any = '';
  testAllData: any = '';
  testDetails: any = '';
  test_name: any = '';
  test_id: any = '';
  error_messages: any = '';

  addAssignmentForm: FormGroup;
  submitted: boolean = false;
  formDisabled = true;
  disbled: boolean = true;
  updateNewData: any = '';
  date: Date;
  constructor(private router: Router, public datepipe: DatePipe, public formBuilder: FormBuilder, public util: UtilService, public service: SharedServiceService) {
    this.setupLoginFormData();
    this.classId = localStorage.getItem('classListId');
    this.test_name = localStorage.getItem('test_name');
    this.test_id = localStorage.getItem('test_id');

    this.getTestListing();
    this.getTestDetails();
    this.addAssignmentForm.disable();

  }

  edit() {
    this.disbled = false
    this.formDisabled = false
    this.addAssignmentForm.enable();
    this.isClicked = false;
  }

  setupLoginFormData() {

    this.addAssignmentForm = this.formBuilder.group(
      {
        test_name: new FormControl('', Validators.required),
        instruction: new FormControl('', Validators.required),
        available_date: new FormControl('', Validators.required),
        available_time: new FormControl('', Validators.required),
        available_dateTo: new FormControl('', Validators.required),
        available_timeTo: new FormControl('', Validators.required),
        timer_check: new FormControl(''),
        timer_minute: new FormControl(''),
        total_attempt: new FormControl(''),
        attempt_type: new FormControl(''),
        pagination: new FormControl(''),
        view_answer: new FormControl('')
      }
    );
  }

  ngOnInit() {
  }

  // get test listing data
  getTestListing() {
    this.isLoadingBool = true;
    let params = {
      "class_id": this.classId
    }

    this.service.post('test-list-api', params, 1).subscribe(result => {
      this.testAllData = result.test_data
      this.isLoadingBool = false;
    })
  }


  getTestDetails() {
    this.isLoadingBool = true;
    let params = {
      "test_id": this.test_id
    }

    this.service.post('test-details', params, 1).subscribe(result => {
      console.log('result', result)
      this.isLoadingBool = false;
      this.testDetails = result.test_data
      this.updateNewData = result.test_data;
      this.addAssignmentForm.patchValue({
        "test_name": this.updateNewData.test_name,
        "instruction": this.updateNewData.instruction,
        "available_date": this.datepipe.transform(this.updateNewData.start_date, 'yyyy-MM-dd'),
        "available_time": this.updateNewData.start_time,
        "available_dateTo": this.datepipe.transform(this.updateNewData.end_date, 'yyyy-MM-dd'),
        'available_timeTo': this.updateNewData.end_time,
        "timer_minute": this.updateNewData.test_timer,
        "total_attempt": this.updateNewData.test_attempts,
        "pagination": this.updateNewData.pagination,
        'view_answer': (this.updateNewData.view_ans_after_complition == 'Yes') ? 1 : 0,
        'timer_check': (this.updateNewData.test_timer != null) ? true : false,
        'attempt_type': this.updateNewData.attempt_type
      })
    })
  }

  onChange() {

    localStorage.setItem('test_name', this.selectedTestDetails.test_name);
    localStorage.setItem('test_id', this.selectedTestDetails.test_id);

    this.test_name = this.selectedTestDetails.test_name;
    this.test_id = this.selectedTestDetails.test_id
    this.isLoadingBool = true;
    let params = {
      "test_id": this.selectedTestDetails.test_id
    }

    this.service.post('test-details', params, 1).subscribe(result => {
      this.isLoadingBool = false;
      this.testDetails = result.test_data
      this.updateNewData = result.test_data;
      this.addAssignmentForm.patchValue({
        "test_name": this.updateNewData.test_name,
        "instruction": this.updateNewData.instruction,
        "available_date": this.datepipe.transform(this.updateNewData.start_date, 'yyyy-MM-dd'),
        "available_time": this.updateNewData.start_time,
        "available_dateTo": this.datepipe.transform(this.updateNewData.end_date, 'yyyy-MM-dd'),
        'available_timeTo': this.updateNewData.end_time,
        "timer_minute": this.updateNewData.test_timer,
        "total_attempt": this.updateNewData.test_attempts,
        "pagination": this.updateNewData.pagination,
        'view_answer': (this.updateNewData.view_ans_after_complition == 'Yes') ? 1 : 0,
        'timer_check': (this.updateNewData.test_timer != null) ? true : false,
        'attempt_type': this.updateNewData.attempt_type
      })
      // this.testDetails = result.test_data
      // this.SettingsData.test_name = result.test_data.test_name;
      // this.SettingsData.instruction = result.test_data.instruction;

      // this.SettingsData.start_date = new Date(result.test_data.start_date);
      // this.SettingsData.test_available_to = new Date(result.test_data.end_date);

      // this.SettingsData.test_availble_from_time = result.test_data.start_time;
      // this.SettingsData.test_availble_to_time = result.test_data.end_time;

      // this.SettingsData.timer_time = result.test_data.test_timer;
      // this.SettingsData.attempts = Number(result.test_data.test_attempts);
      // this.SettingsData.pagination = Number(result.test_data.pagination);
      // this.SettingsData.view_ans_after_compliation = (result.test_data.view_ans_after_complition == 'Yes') ? 1 : 0

    })

  }

  goToTestHome() {
    this.router.navigate(['/test/question-screen']);
  }

  goToTestAssessment() {
    this.router.navigate(['/test/test-assessment']);
  }

  // confirm add test
  confirmEdit() {
    this.submitted = true;
    if (this.addAssignmentForm.invalid) {
      return;
    }

    this.SettingsData.timer = (this.SettingsData.timer == true) ? "Yes" : "No"
    this.SettingsData.test_id = this.test_id;
    var x = new Date(this.SettingsData.test_available_from);
    var y = new Date(this.SettingsData.test_available_to);

    if (x > y) {
      this.util.errorAlertPopup('start date should be less than end date');
    }
    else {
      let params = {
        test_name: this.addAssignmentForm.value.test_name,
        instruction: this.addAssignmentForm.value.instruction,
        test_available_from: this.addAssignmentForm.value.available_date,
        test_available_to: this.addAssignmentForm.value.available_dateTo,
        test_availble_from_time: this.addAssignmentForm.value.available_time,
        test_availble_to_time: this.addAssignmentForm.value.available_timeTo,
        timer: (this.addAssignmentForm.value.timer_check == true) ? "Yes" : "No",
        timer_time: this.addAssignmentForm.value.timer_minute,
        attempts: this.addAssignmentForm.value.total_attempt,
        attempt_type: this.addAssignmentForm.value.attempt_type,
        pagination: this.addAssignmentForm.value.pagination,
        view_ans_after_compliation: (this.updateNewData.view_ans_after_complition == '1') ? 'Yes' : 'No',
        test_id: this.test_id
      }

      console.log('parmas', params);
      this.isLoadingBool = true;
      this.service.post('update-test-api', params, 1).subscribe(result => {
        console.log('params', params);
        if (result.status == '1') {
          this.isLoadingBool = false;
          this.util.showSuccessAlert('Updated successfully');
          this.router.navigate(['/test/test-listing-home']);
        }
      })
    }
  }
}
