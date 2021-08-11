import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2'
import { is } from 'date-fns/locale';

@Component({
  selector: 'app-question-screen',
  templateUrl: './question-screen.component.html',
  styleUrls: ['./question-screen.component.css']
})
export class QuestionScreenComponent implements OnInit {
  @ViewChild('cancelClassModal') private cancelClassModal: ElementRef;
  @ViewChild('deleteclassModal') private deleteclassModal: ElementRef;
  @ViewChild('deletealertModal') private deletealertModal: ElementRef;
  character = 'a';
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
  boxLength: any = '';
  public totalCount: string = '0';
  loginForm: FormGroup;
  questionIdData: any='';
  test_name: any='';
  ischecked: boolean = false;
  deleteButon: boolean = false;

  constructor(public service: SharedServiceService, public formBuilder: FormBuilder, private toastr: ToastrService, public util: UtilService, private router: Router) {
    this.testId = localStorage.getItem('test_id');
    this.classId = localStorage.getItem('classListId');
    this.test_name = localStorage.getItem('test_name');
    this.getDashboardHeaderData();
    this.getTestListing();
    this.getAllQuestion();
    this.loginForm = this.formBuilder.group(
      {
        description: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.max(10)
          ])
        ),
      }
    );

  }
  onkeyup() {
    this.loginForm.value.description.length;
    this.totalCount = this.loginForm.value.description.length;
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

  goToBackPage() {
    this.router.navigate(['/test/test-listing-home']);
  }

  // get all courses list
  getAllQuestion() {
    this.allData = [];
    let params = {
      "test_id": this.testId
    }
    this.service.post('questions-list-api', params, 1).subscribe(result => {
      console.log('result',result);
      this.isLoadingBool = false;
      if (result.question_data.length > 0) {
        this.allData = result.question_data;
        this.questionSequence = result.question_sequence
      }
      else {
        this.toastr.error(result.question_data);
      }
    })
  }

  nextChar(character) {
    this.character= String.fromCharCode(character.charCodeAt(0) + 1);
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

  }

  onChange() {
    // this.isLoadingBool = true;
    this.allData = [];
    localStorage.setItem('test_id', this.selectedTestDetails.test_id);
    localStorage.setItem('test_name', this.selectedTestDetails.test_name)

    let params = {
      "test_id": this.selectedTestDetails.test_id
    }
    this.service.post('questions-list-api', params, 1).subscribe(result => {

      this.isLoadingBool = false;
      this.test_name = localStorage.getItem('test_name');
      if (result.question_data.length > 0) {
        this.allData = result.question_data;
        this.questionSequence = result.question_sequence
      }
      else {
        this.toastr.error(result.question_data);
      }
    })
  }

  settingsClicked() {
    this.router.navigate(["/test/settings-tabs"]);
  }

  goToTestAssessment() {
    this.router.navigate(['/test/test-assessment']);
  }

  // Delete test step 1
  deleteStep1Test() {
    let params = {
      "step": 1,
      "test_id": [this.testId]
    }
    this.service.post('delete-test-api', params, 1).subscribe(result => {
      this.deleteTestData = result.test_data[0].test_name
    })
  }

  // Delete test step 2
  deleteStep2Test() {
    let params = {
      "step": 2,
      "test_id": [this.testId]
    }
    this.isLoadingBool = true;
    this.service.post('delete-test-api', params, 1).subscribe(result => {
      this.deleteclassModal.nativeElement.click();
      this.isLoadingBool = false;

      this.router.navigate(['/test/test-listing-home'])
    })
  }

  // get events of check box for edit or add button show and hide
  isCheckClicked(data) {
    this.questionId = data.question_id
  }

  // Delete question
  deleteQuestion(data) {
    this.questionIdData = data.question_id
  }

  deleteQuestionStep2() {
    this.deletealertModal.nativeElement.click();
    let params = {
      "test_id": this.testId,
      "questions_ids_for_delete": this.questionIdData
    }
    this.isLoadingBool = true;
    this.service.post('delete-question-api', params, 1).subscribe(result => {
      this.util.showSuccessToast('Question deleted successfully');
      this.isLoadingBool = false;
      this.getAllQuestion();
  
    })
  }

  editQuestion(type, data) {

    let dataType = type;


    switch (dataType) {
      case 'multiple_choice_type_paper':
        this.router.navigate(['/test/multiple-choice', { id: data.question_id }]);
        break;
      case 'ordering_type_paper':
        this.router.navigate(['/test/ordering', { id: data.question_id }]);
        break;
      case 'matching_type_paper':
        this.router.navigate(['/test/matching', { id: data.question_id }]);
        break;
      case 'true_false_type_paper':
        this.router.navigate(['/test/true-false', { id: data.question_id }]);
        break;
      case 'short_ques_ans_type_paper':
        this.router.navigate(['/test/short-answer', { id: data.question_id }]);
        break;
      case 'fill_in_the_blanks_type_paper':
        this.router.navigate(['/test/fill-blanks', { id: data.question_id }]);
        break;
      default:

        break;
    }
  }
}
