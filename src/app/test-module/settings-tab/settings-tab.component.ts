import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { time } from 'console';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';
@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.component.html',
  styleUrls: ['./settings-tab.component.scss']
})
export class SettingsTabComponent implements OnInit {
  isClicked:boolean=true;
  SettingsData: any = {
    test_name: '',
    instruction: '',
    start_date: '',
    end_time:'',
    timer: '',
    timer_time: '',
    attempts: '',
    pagination: '',
    view_ans_after_compliation: '',
    start_time:'',
    end_date:'',
    attempts_score:''
  }
  selectedTestDetails: any = "";
  allData: any = [];
  isLoadingBool: boolean = true;
  classId: any = '';
  testAllData: any = '';
  testDetails: any = '';
  test_name: any = '';
  test_id: any = '';
  constructor(private router: Router, public service: SharedServiceService) {
    this.classId = localStorage.getItem('classListId');
    this.test_name = localStorage.getItem('test_name');
    this.test_id = localStorage.getItem('test_id');

    this.getTestListing();
    this.getTestDetails();
  }

  ngOnInit() {
  }

  confirmEditStep1(){
    this.isClicked=false;
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


  getTestDetails(){
    this.isLoadingBool = true;
    let params = {
      "test_id": this.test_id
    }

    this.service.post('test-details', params, 1).subscribe(result => {
      console.log('result',result);
      this.isLoadingBool = false;
      this.testDetails = result.test_data
      this.SettingsData.test_name=result.test_data.test_name;
      this.SettingsData.instruction=result.test_data.instruction;
      this.SettingsData.start_date=new Date(result.test_data.start_date);
      this.SettingsData.end_date=new Date(result.test_data.end_date);
      this.SettingsData.start_time=result.test_data.start_time
      this.SettingsData.end_time=result.test_data.end_time;
      this.SettingsData.timer_time=result.test_data.test_timer;
      this.SettingsData.attempts=Number(result.test_data.test_attempts);
      this.SettingsData.pagination=Number(result.test_data.pagination);
      this.SettingsData.view_ans_after_compliation= (result.test_data.view_ans_after_complition=='Yes')?1:0
    })
  }

  onChange(){
    console.log('selectedTestDetails',this.selectedTestDetails.test_id);
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
      console.log('result',result);
      this.testDetails = result.test_data
      this.SettingsData.test_name=result.test_data.test_name;
      this.SettingsData.instruction=result.test_data.instruction;

      this.SettingsData.start_date=new Date(result.test_data.start_date);
      this.SettingsData.test_available_to=new Date(result.test_data.end_date);

      this.SettingsData.test_availble_from_time=result.test_data.start_time;
      this.SettingsData.test_availble_to_time=result.test_data.end_time;

      this.SettingsData.timer_time=result.test_data.test_timer;
      this.SettingsData.attempts=Number(result.test_data.test_attempts);
      this.SettingsData.pagination=Number(result.test_data.pagination);
      this.SettingsData.view_ans_after_compliation= (result.test_data.view_ans_after_complition=='Yes')?1:0
      
    })

  }

  goToTestHome() {
    this.router.navigate(['/test/question-screen']);
  }

  goToTestAssessment() {
    this.router.navigate(['/test/test-assessment']);
  }

  confirmEdit(){
    console.log('this.SettingsData',this.SettingsData);
  }
}
