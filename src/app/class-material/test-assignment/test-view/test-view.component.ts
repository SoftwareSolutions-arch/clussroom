import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';
import { Subscription, timer } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.css']
})
export class TestViewComponent implements OnInit {
  id: any;
  subscription: Subscription;
  questionData: any;
  questionId: any[] = [];
  arrayLength: number;
  replaceData: any;
  backButton: boolean = false;
  question_sequence: any = [];
  questionData2: any;
  answer: any = [];
  answerMtching: any = [];
  multiChoiceValue: any = [];
  shortAnswer: any = [];
  trueFalseDataValue: any = [];
  counts = 0;
  nextBtn: boolean = true;
  totalPage: any;
  isLoadingBool = true;
  constructor(private service: SharedServiceService, private router: Router, private route: ActivatedRoute, private util: UtilService, private _sanitizer: DomSanitizer) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    })
  }

  ngOnInit() {
    this.counts += 1;
    this.getQuestion();
    // this. getApi();
  }
  // get questions 
  getQuestion() {
    const data = {
      test_id: this.id,
      "user_id": localStorage.getItem('uid'),
      page: this.counts
    }
    this.service.post('test-submission-list', data, 1).subscribe(res => {
      this.isLoadingBool = false
      this.questionData = res.result
      this.totalPage = res.total_page

      if (res.question_data == 'No Question Found') {
        this.util.errorAlertPopup('No Question Found');
      }
      this.questionData.forEach((element, index) => {
        if (element.type === 'Fill in the blanks') {
          if (element.paper_summary.includes('_')) {
            element.paper_summary = this.findStarWord(element.paper_summary, index);
          }
        }
      });
    })
  }
  // nextPage() {
  //   this.submitNext();
  //   this.questionData.forEach(element => {
  //     this.questionId.push(element.submission_id)
  //   });
  //   // this.getQuestion();
  //   const data = {
  //     test_id: this.id,
  //     previous_pid: this.questionId
  //   }
  //   this.service.post('questions-for-take-test', data, 1).subscribe(res => {
  //     this.questionData = res.question_data
  //     if (res.question_data) {
  //       this.backButton = true;
  //     }
  //     if (res.question_data == 'No Question Found') {
  //       this.util.errorAlertPopup('No Question Found');
  //     }
  //     if (res.question_data == null || res.question_data == '') {
  //       this.util.errorAlertPopup('No Question Found');
  //     }
  //     this.questionData.forEach((element, index) => {
  //       if (element.type === 'Fill in the blanks') {
  //         if (element.paper_summary.includes('_')) {
  //           element.paper_summary = this.findStarWord(element.paper_summary, index);
  //         }
  //       }
  //     });
  //   })
  // }
  nextPage() {
    this.isLoadingBool = true
    if (this.counts === this.totalPage) {
      this.nextBtn = false
    }
    if (this.counts > this.totalPage) {
      this.nextBtn = false
    }
    this.counts += 1;
    const data = {
      test_id: this.id,
      "user_id": localStorage.getItem('uid'),
      "page": this.counts
    }
    this.service.post('test-submission-list', data, 1).subscribe(res => {
      this.isLoadingBool = false;
      this.questionData = res.question_data
      if (res.question_data) {
        this.backButton = true;
      }
      if (res.question_data == 'No Question Found') {
        this.util.errorAlertPopup('No Question Found');
      }
      if (res.question_data == null || res.question_data == '') {
        this.util.errorAlertPopup('No Question Found');
      }
      this.questionData.forEach((element, index) => {
        if (element.type === 'Fill in the blanks') {
          if (element.paper_summary.includes('_')) {
            element.paper_summary = this.findStarWord(element.paper_summary, index);
          }
        }
      });
    })
  }
  findStarWord(word1, index) {
    const regexp = /\_(.*?)\ /g;
    const array = [...word1.matchAll(regexp)];
    this.arrayLength = array.length
    
    for (let i = 0; i < array.length; i++) {
      var tag = '---------------' + ''
      this.replaceData = word1.replace(/\_(.*?)\ /, tag)
      word1 = this.replaceData;
    }

    return this._sanitizer.bypassSecurityTrustHtml(this.replaceData);
  }
  //  go to back page data
  goToBackPage() {
    this.isLoadingBool = true;
    this.counts -= 1;
    const data = {
      test_id: this.id,
      "user_id": localStorage.getItem('uid'),
      "page": this.counts
    }
    this.service.post('test-submission-list', data, 1).subscribe(res => {
      this.isLoadingBool = false
      this.questionData = res.result

      if (res.question_data == 'No Question Found') {
        this.util.errorAlertPopup('No Question Found');
      }
      this.questionData.forEach((element, index) => {
        if (element.type === 'Fill in the blanks') {
          if (element.paper_summary.includes('_')) {
            element.paper_summary = this.findStarWord(element.paper_summary, index);
          }
        }
      });
    })
  }
}
