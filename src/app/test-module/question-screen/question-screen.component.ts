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

  constructor(public service: SharedServiceService, public util: UtilService, private router: Router) { }

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
}
