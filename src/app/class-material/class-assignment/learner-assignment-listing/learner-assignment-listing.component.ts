import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';

@Component({
  selector: 'app-learner-assignment-listing',
  templateUrl: './learner-assignment-listing.component.html',
  styleUrls: ['./learner-assignment-listing.component.css']
})
export class LearnerAssignmentListingComponent implements OnInit {
  listData: any;
  page = 1;
  count = 0;
  pageSize = 10;
  p: number = 1;
  assignmentIds: any;
  disabledData: boolean = true;
  isLoadingBool = true;
  constructor(private service: SharedServiceService, private util: UtilService,private router: Router) { }

  ngOnInit() {
    this.assignmentList();
  }

  // get assignment list
  assignmentList(){
  const data = {
    "class_id": localStorage.getItem('classListId')
  }
  this.service.post('assignment-list-api',data,1).subscribe(res => {
    this.listData = res.assignment_data
    if(res.status == '1'){
      this.isLoadingBool = false;
    }
  })
  }

  // get assignment id
  assignmentId(id,index){
   this.assignmentIds = id
   if (this.listData[index].isActive) {
    this.listData[index].isActive = false;
  } else {
    this.listData[index].isActive = true;
  }
  }

  // after click on start button
  startPage(){  
    this.router.navigate(['/class-material/assignment-detail-new'], { queryParams: { id: this.assignmentIds} });  
  }
  viewPage(){
    this.router.navigate(['/class-material/view-learner'], { queryParams: { id: this.assignmentIds} });  

  }
  continuePage(){
    this.router.navigate(['/class-material/continue-learner'], { queryParams: { id: this.assignmentIds} });  
  }
  startPages(id){  
    this.router.navigate(['/class-material/assignment-detail-new'], { queryParams: { id: id} });  
  }
  viewPages(id){
    this.router.navigate(['/class-material/view-learner'], { queryParams: { id: id} });  

  }
  continuePages(id){
    this.router.navigate(['/class-material/continue-learner'], { queryParams: { id: id} });  
  }
}
