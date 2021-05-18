import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';

@Component({
  selector: 'app-question-screen',
  templateUrl: './question-screen.component.html',
  styleUrls: ['./question-screen.component.css']
})
export class QuestionScreenComponent implements OnInit {
  @ViewChild('cancelClassModal') private cancelClassModal: ElementRef;
  isLoadingBool: boolean = true;
  allData: any = [];
  testAllData: any = '';
  testId: any = '';
  classId: any = '';
  headerData: any = '';
  selectedTestDetails: any = "";

  constructor(public service: SharedServiceService, public util: UtilService, private router: Router) {
    this.testId = localStorage.getItem('test_id');
    console.log('++++++++++++', this.testId);
    this.classId = localStorage.getItem('classListId');
    this.getDashboardHeaderData();
    this.getTestListing();
    this.getAllQuestion();

  }

  ngOnInit() {
  }

  goToFillBlanks() {
    this.cancelClassModal.nativeElement.click();
    this.router.navigate(['/test/fill-blanks']);
  }

  goToMatching() {
    this.cancelClassModal.nativeElement.click();
    this.router.navigate(['/test/matching']);
  }

  goToMultipleQuestion() {
    this.cancelClassModal.nativeElement.click();
    this.router.navigate(['/test/multiple-choice']);
  }

  goToOrdering() {
    this.cancelClassModal.nativeElement.click();
    this.router.navigate(['/test/ordering']);
  }

  goToTrueFalse() {
    this.cancelClassModal.nativeElement.click();
    this.router.navigate(['/test/true-false']);
  }

  goToShortAnswer() {
    this.cancelClassModal.nativeElement.click();
    this.router.navigate(['/test/short-answer']);
  }

  goToReOrder() {
    this.router.navigate(['/test/reorder-screen']);
  }

  goToEditPoints() {
    this.router.navigate(['/test/edit-points']);
  }

  goToPreview() {
    this.router.navigate(['/test/midterm-preview-1']);
  }

  // get all courses list
  getAllQuestion() {
    let params = {
      "test_id": this.testId
    }
    this.service.post('questions-list-api', params, 1).subscribe(result => {
      console.log('result', result);
      this.allData = result.question_data;
      this.isLoadingBool = false;
    })
  }

  getDashboardHeaderData() {
    let params = {
      "class_id": this.classId
    }
    this.service.post('class-material-dashboard-api', params, 1).subscribe(result => {

      this.headerData = result
      this.isLoadingBool = false;
    })
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

  selectNewCourse() {
    console.log('this.selectedTestDetails', this.selectedTestDetails);
  }

  onChange() {
    localStorage.setItem('test_id', this.selectedTestDetails.test_id);
    this.isLoadingBool = true;
    let params = {
      "test_id": this.selectedTestDetails.test_id
    }
    this.service.post('questions-list-api', params, 1).subscribe(result => {
      console.log('resut', result);
      this.isLoadingBool = false;
      this.allData = result.question_data;
      this.isLoadingBool = false;
    })
  }
}