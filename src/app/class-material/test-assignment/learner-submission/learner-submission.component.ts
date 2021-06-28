import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';

@Component({
  selector: 'app-learner-submission',
  templateUrl: './learner-submission.component.html',
  styleUrls: ['./learner-submission.component.css']
})
export class LearnerSubmissionComponent implements OnInit {
  submissionData: any;
  listData: any;
  isLoadingBool: boolean = true;

  constructor(private service: SharedServiceService, private router: Router, private util: UtilService) { }

  ngOnInit() {
    this.getSubmissionData();
  }
  // get submission list
  getSubmissionData() {
    const data = {
      user_id: "56"
    }
    this.service.post('submission-list', data, 1).subscribe(res => {
      this.submissionData = res
      this.isLoadingBool = false;
      this.listData = res.result
      if (res.status == '0') {
        this.util.errorAlertPopup('No Data Found');
      }
    })
  }
  //   view page
  viewPage(id) {
    this.router.navigate(['/class-material/learner-view'], { queryParams: { id: id } });
  }
}
