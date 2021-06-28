import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-learner-student-panel2',
  templateUrl: './learner-student-panel2.component.html',
  styleUrls: ['./learner-student-panel2.component.css']
})
export class LearnerStudentPanel2Component implements OnInit {
  id: any;
  subscription: Subscription;
  questionData: any;
  constructor(private service: SharedServiceService, private route: ActivatedRoute, private util: UtilService) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    })
  }

  ngOnInit() {
    this.getQuestion();
  }
  // get questions 
  getQuestion() {
    const data = {
      test_id: this.id
    }
    this.service.post('questions-for-take-test', data, 1).subscribe(res => {
     this.questionData = res.question_data
      if (res.question_data == 'No Question Found') {
        this.util.errorAlertPopup('No Question Found');
      }
    })
  }
  nextPage(){
    const data = {
      test_id: this.id,
      previous_pid:
      [2650,2652]
    }
    this.service.post('questions-for-take-test', data, 1).subscribe(res => {
     this.questionData = res.question_data
      if (res.question_data == 'No Question Found') {
        this.util.errorAlertPopup('No Question Found');
      }
    })
  }
}
