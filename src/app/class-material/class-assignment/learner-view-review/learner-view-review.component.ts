import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';

@Component({
  selector: 'app-learner-view-review',
  templateUrl: './learner-view-review.component.html',
  styleUrls: ['./learner-view-review.component.css']
})
export class LearnerViewReviewComponent implements OnInit {
  id: string;
  assignmentData: any;

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
    })
  }
  gotoQuestion(){
    this.router.navigate(['/class-material/view-learner-assignment'], { queryParams: { id: this.id} });  

  }

}
