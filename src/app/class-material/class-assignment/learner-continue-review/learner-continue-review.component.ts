import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';

@Component({
  selector: 'app-learner-continue-review',
  templateUrl: './learner-continue-review.component.html',
  styleUrls: ['./learner-continue-review.component.css']
})
export class LearnerContinueReviewComponent implements OnInit {
  id: string;
  assignmentData: any;
  isLoadingBool = true;
  submission_id: void;
  constructor(private service: SharedServiceService,private route: ActivatedRoute,private router: Router) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    })
   }

  ngOnInit() {
    this.assignmentDetail();
  }
  //get detail api
  assignmentDetail(){
    const data = {
      "assignment_id": this.id

    }
    this.service.post('assignment-details',data,1).subscribe(res => {
      this.assignmentData = res.assignment_details
      this.submission_id = localStorage.setItem('submission_id',res.assignment_details.submission_id)
      if(res.status == '1'){
        this.isLoadingBool = false
      }
    })
  }
  gotoQuestion(){
    this.router.navigate(['/class-material/learner-review'], { queryParams: { id: this.id} });  

  }

}
