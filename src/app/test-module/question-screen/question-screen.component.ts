import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-question-screen',
  templateUrl: './question-screen.component.html',
  styleUrls: ['./question-screen.component.css']
})
export class QuestionScreenComponent implements OnInit {
  @ViewChild('cancelClassModal') private cancelClassModal: ElementRef;
  @ViewChild('deleteclassModal') private deleteclassModal: ElementRef;
  isLoadingBool: boolean = true;
  allData: any = [];
  testAllData: any = '';
  testId: any = '';
  classId: any = '';
  headerData: any = '';
  selectedTestDetails: any = "";
  deleteTestData: any = '';
  questionId: any = '';
  questionSequence: any = '';
  constructor(public service: SharedServiceService, private toastr: ToastrService, public util: UtilService, private router: Router) {
    this.testId = localStorage.getItem('test_id');
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
    if (this.allData.length > 0) {
      this.router.navigate(['/test/reorder-screen']);
    }
    else {
      this.toastr.error('No question is availble for edit points')
    }
  }

  goToEditPoints() {
    if (this.allData.length > 0) {
      this.router.navigate(['/test/edit-points']);
    }

    else {
      this.toastr.error('No question is availble for edit points')
    }
  }

  goToPreview() {
    this.router.navigate(['/test/midterm-preview-1']);
  }

  // get all courses list
  getAllQuestion() {
    this.allData = [];
    let params = {
      "test_id": this.testId
    }
    this.service.post('questions-list-api', params, 1).subscribe(result => {
      console.log('result.question_data',result);
      this.isLoadingBool = false;
      if (result.question_data.length>0) {
        this.allData = result.question_data;
        this.questionSequence = result.question_sequence
      }
      else {
        this.toastr.error(result.question_data);
      }
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
    this.allData = [];
    localStorage.setItem('test_id', this.selectedTestDetails.test_id);
    this.isLoadingBool = true;
    let params = {
      "test_id": this.selectedTestDetails.test_id
    }
    this.service.post('questions-list-api', params, 1).subscribe(result => {
      this.isLoadingBool = false;
      if (result.question_data.length>0) {
        this.allData = result.question_data;
        this.questionSequence = result.question_sequence
      }
      else {
        this.toastr.error(result.question_data);
      }
    })
  }

  // Delete test step 1
  deleteStep1Test() {
    // this.isLoadingBool = true;
    let params = {
      "step": 1,
      "test_id": [this.testId]
    }
    this.service.post('delete-test-api', params, 1).subscribe(result => {
      // this.isLoadingBool = false;
      console.log('result', result);
      this.deleteTestData = result.test_data[0].test_name
    })
  }

  // Delete test step 2
  deleteStep2Test() {
    console.log('hello')
    let params = {
      "step": 2,
      "test_id": [this.testId]
    }
    this.isLoadingBool = true;
    this.service.post('delete-test-api', params, 1).subscribe(result => {
      this.deleteclassModal.nativeElement.click();
      this.isLoadingBool = false;
      console.log('result', result);
      this.router.navigate(['/test/test-listing-home'])
    })
  }

  // get events of check box for edit or add button show and hide 
  isCheckClicked(data) {
    console.log('data', data, data.question_id);
    this.questionId = data.question_id
  }

  // Delete question
  deleteQuestion() {
    console.log('this.allData', this.questionSequence)
    let params = {
      "test_id": this.testId,
      "questions_ids_for_delete": this.questionId
    }
    console.log('parmas', params)
    this.isLoadingBool = true;
    this.service.post('delete-question-api', params, 1).subscribe(result => {
      this.isLoadingBool = false;
      this
      this.getAllQuestion();
    })
  }

  editQuestion(data) {
    let dataType = data;
    console.log('dataType', dataType);
    switch (dataType) {
      case 'multiple_choice_type_paper':
        this.router.navigate(['/test/multiple-choice']);
        break;
      case 'ordering_type_paper':
        this.router.navigate(['/test/ordering']);
        break;
      case 'matching_type_paper':
        this.router.navigate(['/test/matching']);
        break;
      case 'true_false_type_paper':
        this.router.navigate(['/test/true-false']);
        break;
      case 'short_ques_ans_type_paper':
        this.router.navigate(['/test/short-answer']);
        break;
      case 'fill_in_the_blanks_type_paper':
        this.router.navigate(['/test/fill-blanks']);
        break;
      default:
        console.log("No such day exists!");
        break;
    }
  }
}