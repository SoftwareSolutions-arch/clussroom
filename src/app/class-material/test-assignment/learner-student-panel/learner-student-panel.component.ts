import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';
import { Subscription, timer } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-learner-student-panel',
  templateUrl: './learner-student-panel.component.html',
  styleUrls: ['./learner-student-panel.component.css']
})
export class LearnerStudentPanelComponent implements OnInit {
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
  totalPage: any;
  count = 1;
  counts = 1;
  nextBtn: boolean = true;
  // timeLeft: number;
  interval;
  timeLeft: number;
  isLoadingBool: boolean = false;
  newdata: any = [];
  timer: any;
  subId: any;
  previousData: boolean = false;
  backButtons: boolean = false;
  submitted: boolean = false;

  constructor(private service: SharedServiceService, private router: Router, private route: ActivatedRoute, private util: UtilService, private _sanitizer: DomSanitizer) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    })
  }

  ngOnInit() {
    this.getQuestion();
    // this.goToBackPage();
  }
  // get questions 
  getQuestion() {
    const data = {
      test_id: this.id
    }
    this.service.post('questions-for-take-test', data, 1).subscribe(res => {
      this.questionData = res.question_data
      this.totalPage = res.total_page
      this.timer = res.timer;
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
      this.startTimer();
    })
  }
  // for timer
  startTimer() {
    this.timeLeft = this.timer
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.pauseTimer();
        this.submit();
      }
    }, 1000)
  }
  pauseTimer() {
    clearInterval(this.interval);
  }
  nextPage() {
    this.isLoadingBool = true
    this.backButtons = true;
    this.counts += 1;
    this.count += 1
    if (this.count === this.totalPage) {
      this.nextBtn = false
    }
    if (this.count > this.totalPage) {
      this.nextBtn = false
    }
    this.submitNext();
    this.questionData.forEach(element => {
      this.questionId.push(element.id)
    });
    // this.getQuestion();
    const data = {
      test_id: this.id,
      previous_pid: this.questionId,
    }
    this.service.post('questions-for-take-test', data, 1).subscribe(res => {
      this.isLoadingBool = false;

      this.questionData = res.question_data
      if (res.question_data) {
        this.backButton = true;
      }
      if (res.question_data == 'No Question Found') {
        this.util.errorAlertPopup('No Question Found');
      }
      if (res.message == 'you Have Reached Maximum Limit For Test') {
        this.util.errorAlertPopup('You Have Reached Maximum Limit For Test');
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
  fillForm = new FormGroup({
    fillData: new FormControl('',)
  })
  onSearchChange(searchValue: string, id, i): void {
    var key = 'id' + id + 'index' + i
    if (this.answer.length !== 0) {
      var isAnswerExist = false;
      var index = -1
      for (let i = 0; i < this.answer.length; i++) {
        if (this.answer[i].key === key) {
          isAnswerExist = true;
          index = i
          break;
        }
      }
      if (isAnswerExist) {
        this.answer[index].value = searchValue
      } else {
        this.answer.push({ id: id, value: searchValue, key: key })
      }
    } else {
      this.answer.push({ id: id, value: searchValue, key: key })
    }
  }
  trueFalseData(searchValue: string, id): void {
    if (this.trueFalseDataValue.length !== 0) {
      var isAnswerExist = false;
      var index = -1
      for (let i = 0; i < this.trueFalseDataValue.length; i++) {
        if (this.trueFalseDataValue[i].id === id) {
          isAnswerExist = true;
          index = i
          break;
        }
      }
      if (isAnswerExist) {
        this.trueFalseDataValue[index].value = searchValue
      } else {
        this.trueFalseDataValue.push({ id: id, value: searchValue })
      }
    } else {
      this.trueFalseDataValue.push({ id: id, value: searchValue })
    }
  }
  multiChoice(searchValue: string, id): void {
    if (this.multiChoiceValue.length !== 0) {
      var isAnswerExist = false;
      var index = -1
      for (let i = 0; i < this.multiChoiceValue.length; i++) {
        if (this.multiChoiceValue[i].id === id) {
          isAnswerExist = true;
          index = i
          break;
        }
      }
      if (isAnswerExist) {
        this.multiChoiceValue[index].value = searchValue
      } else {
        this.multiChoiceValue.push({ id: id, value: searchValue })
      }
    } else {
      this.multiChoiceValue.push({ id: id, value: searchValue })
    }
  }
  shortAnswerData(searchValue: string, id): void {
    if (this.shortAnswer.length !== 0) {
      var isAnswerExist = false;
      var index = -1
      for (let i = 0; i < this.shortAnswer.length; i++) {
        if (this.shortAnswer[i].id === id) {
          isAnswerExist = true;
          index = i
          break;
        }
      }
      if (isAnswerExist) {
        this.shortAnswer[index].value = searchValue
      } else {
        this.shortAnswer.push({ id: id, value: searchValue })
      }
    } else {
      this.shortAnswer.push({ id: id, value: searchValue })
    }
  }

  onSearchMatchingChange(searchValue: string, id, i): void {
    var key = 'id' + id + 'index' + i
    if (this.answerMtching.length !== 0) {
      var isAnswerExist = false;
      var index = -1
      for (let i = 0; i < this.answerMtching.length; i++) {
        if (this.answerMtching[i].key === key) {
          isAnswerExist = true;
          index = i
          break;
        }
      }
      if (isAnswerExist) {
        this.answerMtching[index].value = searchValue
      } else {
        this.answerMtching.push({ id: id, value: searchValue, key: key })
      }
    } else {
      this.answerMtching.push({ id: id, value: searchValue, key: key })
    }
  }
  // drag and drop ordering
  drop(event: CdkDragDrop<string[]>, i) {
    moveItemInArray(this.questionData[i].ordering_sequence, event.previousIndex, event.currentIndex);
  }
  // true false form
  trueFalseForm = new FormGroup({
    true: new FormControl('',)
  })
  shortForm = new FormGroup({
    shortanswer: new FormControl('',)
  })
  submitNext() {
    this.isLoadingBool = true
    var subData = []
    this.questionData.forEach(element => {
      switch (element.type) {
        case 'Fill in the blanks':
          var finalAnswer = []
          if (this.answer.length > 0) {
            this.answer.forEach(element1 => {
              if (element1.id === element.id) {
                finalAnswer.push(element1.value)
              }
            });
            subData.push({
              "answer": finalAnswer,
              "question_paragraph_id": element.id,
            })
          } else {
            subData.push({
              "answer": [],
              "question_paragraph_id": element.id,
            })
          }
          break;
        case 'Matching ':
          var finalAnswerData = []
          if (this.answerMtching.length > 0) {
            this.answerMtching.forEach(element1 => {
              if (element1.id === element.id) {
                finalAnswerData.push(element1.value)
              }
            });
            subData.push({
              "answer": finalAnswerData,
              "question_paragraph_id": element.id,
            })
          } else {
            subData.push({
              "answer": [],
              "question_paragraph_id": element.id,
            })
          }
          break;
        case 'True False':
          var finalAnswerData = []
          if (this.trueFalseDataValue.length > 0) {
            this.trueFalseDataValue.forEach(element1 => {
              if (element1.id === element.id) {
                finalAnswerData.push(element1.value)
              }
            });
            subData.push({
              "answer": finalAnswerData,
              "question_paragraph_id": element.id,
            })
          } else {
            subData.push({
              "answer": [],
              "question_paragraph_id": element.id,
            })
          }

          break;
        case 'Ordering Type':
          subData.push({
            "answer": element.ordering_sequence,
            "question_paragraph_id": element.id,
          })

          break;
        case 'short_ques_ans_type_paper':
          var answer = ''
          if (this.shortAnswer.length > 0) {
            this.shortAnswer.forEach(element1 => {
              if (element1.id == element.id) {
                answer = element1.value
                

                // this.answer.push(element1.value)
              }
            });

            subData.push({
              "answer": [answer],
              "question_paragraph_id": element.id,
            })
          } else {
            subData.push({
              "answer": [],
              "question_paragraph_id": element.id,
            })
          }

          break;
        case 'Multiple Choice Answer':
          var finalAnswerData = []
          if (this.multiChoiceValue.length > 0) {
            this.multiChoiceValue.forEach(element1 => {
              if (element1.id === element.id) {
                finalAnswerData.push(element1.value)
              }
            });
            subData.push({
              "answer": finalAnswerData,
              "question_paragraph_id": element.id,
            })
          } else {
            subData.push({
              "answer": [],
              "question_paragraph_id": element.id,
            })
          }

          break;
      }
    });


    const data = {
      "test_id": this.id,
      "data": subData,
      "page_no": "1",
      submitted: 'No'
    }
    this.service.post('take-test-api', data, 1).subscribe(res => {
      this.isLoadingBool = false
      this.subId = res.Submission_id;
    })
  }

  submit() {
    this.isLoadingBool = true;
    var subData = []
    this.questionData.forEach(element => {
      switch (element.type) {
        case 'Fill in the blanks':
          var finalAnswer = []
          if (this.answer.length > 0) {
            this.answer.forEach(element1 => {
              if (element1.id === element.id) {
                finalAnswer.push(element1.value)
              }
            });
            subData.push({
              "answer": finalAnswer,
              "question_paragraph_id": element.id,
            })
          }
          break;
        case 'Matching ':
          var finalAnswerData = []
          if (this.answerMtching.length > 0) {
            this.answerMtching.forEach(element1 => {
              if (element1.id === element.id) {
                finalAnswerData.push(element1.value)
              }
            });
            subData.push({
              "answer": finalAnswerData,
              "question_paragraph_id": element.id,
            })
          }
          break;
        case 'True False':
          var finalAnswerData = []
          if (this.trueFalseDataValue.length > 0) {
            this.trueFalseDataValue.forEach(element1 => {
              if (element1.id === element.id) {
                finalAnswerData.push(element1.value)
              }
            });
            subData.push({
              "answer": finalAnswerData,
              "question_paragraph_id": element.id,
            })
          }

          break;
        case 'Ordering Type':
          subData.push({
            "answer": element.ordering_sequence,
            "question_paragraph_id": element.id,
          })

          break;
        case 'short_ques_ans_type_paper':
          var answer = ''
          if (this.shortAnswer.length > 0) {
            this.shortAnswer.forEach(element1 => {
              if (element1.id == element.id) {
                answer = element1.value
                

                // this.answer.push(element1.value)
              }
            });

            subData.push({
              "answer": [answer],
              "question_paragraph_id": element.id,
            })
          }

          break;
        case 'Multiple Choice Answer':
          var finalAnswerData = []
          if (this.multiChoiceValue.length > 0) {
            this.multiChoiceValue.forEach(element1 => {
              if (element1.id === element.id) {
                finalAnswerData.push(element1.value)
              }
            });
            subData.push({
              "answer": finalAnswerData,
              "question_paragraph_id": element.id,
            })
          }

          break;
      }
    });


    const data = {
      "test_id": this.id,
      "data": subData,
      "page_no": "1",
      submitted: 'Yes'
    }
    this.service.post('take-test-api', data, 1).subscribe(res => {
      if (res.status == '1') {
        this.isLoadingBool = false;
        // this.util.showSuccessAlert('Test Submitted Successfully');
        // setTimeout(() => {
        //   this.router.navigate(['/class-material/learner-submissions'], { queryParams: { id: userId } });
        // }, 1000);
      }
    })
  }
  gotoView(){
    var userId = localStorage.getItem('uid')
    setTimeout(() => {
      this.router.navigate(['/class-material/learner-submissions'], { queryParams: { id: userId } });
    }, 1000);
  }
  //  go to back page data
  goToBackPage() {
    this.isLoadingBool = true
    this.submitted = true;
    const data = {
      "submission_id": this.subId
    }
    this.service.post('previous-test-submission', data, 1).subscribe(res => {
      this.isLoadingBool = false
      this.questionData = res.result
      this.questionData.forEach((element, index) => {
        if (element.type === 'Fill in the blanks') {
          if (element.paper_summary.includes('_')) {
            element.paper_summary = this.findStarWord(element.paper_summary, index);
          }
        }
      });
    })
  }

  submitedData() {
    if (this.subId) {
      this.updateData();
    } else {
      this.nextPage()
    }
  }

  updateData() {
    this.isLoadingBool = true;
    var subData = []
    this.questionData.forEach(element => {
      switch (element.type) {
        case 'Fill in the blanks':
          var finalAnswer = []
          if (this.answer.length > 0) {
            this.answer.forEach(element1 => {
              if (element1.id === element.id) {
                finalAnswer.push(element1.value)
              }
            });
            subData.push({
              "answer": finalAnswer,
              "submission_id": element.submission_id,
            })
          }
          break;
        case 'Matching ':
          var finalAnswerData = []
          if (this.answerMtching.length > 0) {
            this.answerMtching.forEach(element1 => {
              if (element1.id === element.id) {
                finalAnswerData.push(element1.value)
              }
            });
            subData.push({
              "answer": finalAnswerData,
              "submission_id": element.submission_id,
            })
          }
          break;
        case 'True False':
          var finalAnswerData = []
          if (this.trueFalseDataValue.length > 0) {
            this.trueFalseDataValue.forEach(element1 => {
              if (element1.id === element.id) {
                finalAnswerData.push(element1.value)
              }
            });
            subData.push({
              "answer": finalAnswerData,
              "submission_id": element.submission_id,
            })
          }

          break;
        case 'Ordering Type':
          subData.push({
            "answer": element.ordering_sequence,
            "submission_id": element.submission_id,
          })

          break;
        case 'short_ques_ans_type_paper':
          var answer = ''
          if (this.shortAnswer.length > 0) {
            this.shortAnswer.forEach(element1 => {
              if (element1.id == element.id) {
                answer = element1.value
              }
            });

            subData.push({
              "answer": [answer],
              "submission_id": element.submission_id,
            })
          }

          break;
        case 'Multiple Choice Answer':
          var finalAnswerData = []
          if (this.multiChoiceValue.length > 0) {
            this.multiChoiceValue.forEach(element1 => {
              if (element1.id === element.id) {
                finalAnswerData.push(element1.value)
              }
            });
            subData.push({
              "answer": finalAnswerData,
              "submission_id": element.submission_id,
            })
          }

          break;
      }
    });
    const data = {
      answerdata: subData
    }
    this.service.post('edit-previous-test-submission', data, 1).subscribe(res => {
      this.isLoadingBool = false;
      if (res.status == '1') {
        this.nextPage();
        this.submitted = false;
      }
      this.isLoadingBool = false;
    })
  }
}
