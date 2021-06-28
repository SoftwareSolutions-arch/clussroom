import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';

@Component({
  selector: 'app-learner-without-completion',
  templateUrl: './learner-without-completion.component.html',
  styleUrls: ['./learner-without-completion.component.css']
})
export class LearnerWithoutCompletionComponent implements OnInit {
  id: string;
  learnerData: any;
  learnerList: any;
  ids: any;
  isLoadingBool: boolean = false;

  constructor(private service: SharedServiceService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    })
  }

  ngOnInit() {
    this.getTestDetail();
    this.getList();
    // this.getTestDetails();
  }
  getTestDetail() {
    const data = {
      "test_id": this.id
    }
    this.service.post('test-details', data, 1).subscribe(res => {
      this.learnerData = res.test_data
    })
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
  // back page
  backToPage() {
    this.router.navigate(['/class-material/learner-test'], { queryParams: { id: this.id } });
  }
  // get id
  getChildData(id) {
    this.ids = id
    this.getTestDetails();
  }
  getTestDetails() {
    this.isLoadingBool = true;
    const data = {
      "test_id": this.ids
    }
    this.service.post('test-details', data, 1).subscribe(res => {
      this.learnerData = res.test_data
      if (res.status == '1') {
        this.isLoadingBool = false;
      }
    })
  }
  // go to take test page
  takeTest(){
    var newId = this.id
    if(this.ids){
      this.router.navigate(['/class-material/learner-student-panel'], { queryParams: { id: this.ids } });
    }else {
      this.router.navigate(['/class-material/learner-student-panel'], { queryParams: { id: this.id} });
    }
  }
}
