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

  testId: any = '';
  classId: any = '';
  headerData: any = '';
  constructor(public service: SharedServiceService, public util: UtilService, private router: Router) {
    this.getAllQuestion();
    // this.testId = this.router.getCurrentNavigation().extras.state;
    this.classId = localStorage.getItem('classListId');
    console.log('testId', this.classId);
    this.getDashboardHeaderData();

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
      "test_id": "348"
    }
    this.service.post('questions-list-api', params, 1).subscribe(result => {
      this.allData = result.question_data;
      this.isLoadingBool = false;
    })
  }


  getDashboardHeaderData() {
    let params = {
      "class_id": this.classId
    }
    this.service.post('class-material-dashboard-api', params, 1).subscribe(result => {
      console.log('class-material-dashboard-api', result);
      this.headerData = result
      this.isLoadingBool = false;
    })
  }
}