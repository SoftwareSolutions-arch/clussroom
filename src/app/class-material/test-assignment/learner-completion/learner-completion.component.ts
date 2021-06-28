import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';

@Component({
  selector: 'app-learner-completion',
  templateUrl: './learner-completion.component.html',
  styleUrls: ['./learner-completion.component.css']
})
export class LearnerCompletionComponent implements OnInit {
  id: string;
  learnerData: any;

  constructor(private service: SharedServiceService,private router: Router,private route: ActivatedRoute ) { 
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    })
  }

  ngOnInit() {
    this.getTestDetail();
  }
   getTestDetail(){
     const data ={
      "test_id": this.id
     }
     this.service.post('test-details',data,1).subscribe(res => {
      this.learnerData = res.test_data
     })
   }
}
