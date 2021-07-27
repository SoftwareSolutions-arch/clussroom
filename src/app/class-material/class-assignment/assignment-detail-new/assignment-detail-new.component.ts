import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';

@Component({
  selector: 'app-assignment-detail-new',
  templateUrl: './assignment-detail-new.component.html',
  styleUrls: ['./assignment-detail-new.component.css']
})
export class AssignmentDetailNewComponent implements OnInit {
  id: string;
  assignmentData: any;
  isLoadingBool = true;
  constructor(private service: SharedServiceService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    })
  }

  ngOnInit() {
    this.assignmentDetail();
  }

  //get detail api
  assignmentDetail() {
    const data = {
      "assignment_id": this.id
    }
    this.service.post('assignment-details', data, 1).subscribe(res => {
      this.assignmentData = res.assignment_details
      if (res.status == '1') {
        this.isLoadingBool = false;
      }
    })
  }

  gotoQuestion() {
    this.router.navigate(['/class-material/learner-start-review'], { queryParams: { id: this.id } });
  }
}