import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';
@Component({
  selector: 'app-test-assessment',
  templateUrl: './test-assessment.component.html',
  styleUrls: ['./test-assessment.component.css']
})
export class TestAssessmentComponent implements OnInit {
  test_name: any = '';
  selectedTestDetails: any = "";
  classId: any = '';
  isLoadingBool: boolean = true;
  testAllData: any = '';
  constructor(public service: SharedServiceService, public util: UtilService, private router: Router) {
    this.classId = localStorage.getItem('classListId');
    this.test_name = localStorage.getItem('test_name');
  }

  ngOnInit() {
    this.getTestListing();
  }

  goToTestHome() {
    this.router.navigate(['/test/question-screen']);
  }

  settingsClicked() {
    this.router.navigate(["/test/settings-tabs"]);
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


  onChange() {
    localStorage.setItem('test_name', this.selectedTestDetails.test_name)
    localStorage.setItem('test_id', this.selectedTestDetails.test_id);
    this.isLoadingBool = true;
    let params = {
      "test_id": this.selectedTestDetails.test_id
    }
    this.service.post('test-list-api', params, 1).subscribe(result => {

    })
  }
}
