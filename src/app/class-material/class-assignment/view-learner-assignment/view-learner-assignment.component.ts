import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';

@Component({
  selector: 'app-view-learner-assignment',
  templateUrl: './view-learner-assignment.component.html',
  styleUrls: ['./view-learner-assignment.component.css']
})
export class ViewLearnerAssignmentComponent implements OnInit {
  subData: any;
  attachmentData: any;
  attachmentDataName: any;
  id: string;
  assignmentData: any;
  assignmentQuestionId: any;
  imagedata: any;
  attachmentDataNames: any;

  constructor(private service: SharedServiceService,private route:ActivatedRoute) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    })
   }

  ngOnInit() {
    this.preSubmissionData();
    this.getDataById();
  }
  answerForm = new FormGroup({
    answer: new FormControl('',)
  })
  assignmentForm = new FormGroup({
    description : new FormControl('',)
  })
  getDataById(){
    const data = {
      "assignment_id":this.id
    }
    this.service.post('assignment-questions-listing',data,1).subscribe(res => {
      this.assignmentData = res.result[0].questions
      this.assignmentQuestionId = res.result[0].id
      this.imagedata = res.result[0].attachments
      this.attachmentDataNames = res.result[0].image_name
       this.assignmentForm.patchValue({
         description: this.assignmentData
       })
    })
  }

  preSubmissionData(){
    var id = localStorage.getItem('submission_id');
    const data = {
      submission_id : id
    }
    this.service.post('previous-assignment-submission',data,1).subscribe(res => {
      this.subData = res.result.answer;
      this.attachmentData = res.result.submission_attachments
      this.attachmentDataName = res.result.questions_image_name
      this.answerForm.patchValue({
        answer: this.subData
      })
    })
  }
}
