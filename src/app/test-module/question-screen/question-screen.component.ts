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
  questionData: any = [];
  multiChoiceQuestion: any = [];
  fillBlanksQuestion: any = [];
  trueFalseQuestion: any = [];
  orderingQuestion: any = [];
  matchingQuestion: any = [];
  constructor(public service: SharedServiceService, public util: UtilService, private router: Router) {
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
      "test_id": "348"
    }
    this.service.post('questions-list-api', params, 1).subscribe(result => {
      this.isLoadingBool = false;
      console.log('result', result);
      this.questionData = result.question_data

      this.questionData.forEach(element => {
        if (element.questiontypename == "Multiple Choice Answer") {
          this.multiChoiceQuestion.push(element)
        }

        if (element.questiontypename == "Fill in the blanks") {
          this.fillBlanksQuestion.push(element)
        }
        if (element.questiontypename == "True False ") {
          this.trueFalseQuestion.push(element)
        }

        if (element.questiontypename == "Ordering Type") {
          this.orderingQuestion.push(element)
        }

        if (element.questiontypename == "Matching ") {
          this.matchingQuestion.push(element)
        }
      });
      // console.log('multiChoiceQuestion', this.multiChoiceQuestion);
      // console.log('fillBlanksQuestion', this.fillBlanksQuestion);
      // console.log('trueFalseQuestion', this.trueFalseQuestion);
      console.log('matchingQuestion', this.matchingQuestion);

    })
  }
}