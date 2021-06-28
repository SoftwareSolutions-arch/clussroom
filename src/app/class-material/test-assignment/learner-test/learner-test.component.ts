import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';

@Component({
  selector: 'app-learner-test',
  templateUrl: './learner-test.component.html',
  styleUrls: ['./learner-test.component.css']
})
export class LearnerTestComponent implements OnInit {
  learnerList: any;
  learnerLists: any;
  isLoadingBool = true
  constructor(private service: SharedServiceService, private util: UtilService, private router: Router) { }

  ngOnInit() {
    this.getList();
  }
  // get learner list
  getList() {
    const data = {
      "class_id": localStorage.getItem('classListId')
    }
    this.service.post('test-listing-by-classid', data, 1).subscribe(res => {
      this.learnerList = res.test_data
      if (res.status == '1') {
        this.isLoadingBool = false;
      }
    })
  }
  // get assignment id
  testId(id, index) {
    this.learnerLists = id
    if (this.learnerList[index].isActive) {
      this.learnerList[index].isActive = false;
    } else {
      this.learnerList[index].isActive = true;
    }
  }

  goToTest() {
    this.router.navigate(['/class-material/learner-without-completion'], { queryParams: { id: this.learnerLists } });
  }
}
