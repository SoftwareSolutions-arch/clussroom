import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';
import { AssignmentService } from '../assignment.service';
import {TestAssessmentHomeComponent} from '../test-assessment-home/test-assessment-home.component'

@Component({
  selector: 'app-assignment-header',
  templateUrl: './assignment-header.component.html',
  styleUrls: ['./assignment-header.component.css']
})
export class AssignmentHeaderComponent implements OnInit {

  headerData: any = '';
  isLoadingBool: boolean = true;
  classId: any = '';
  constructor(public service: SharedServiceService, public util: UtilService, 
    private router: Router,private assignService: AssignmentService) {
    this.classId = localStorage.getItem('classListId');
    
    this.getDashboardHeaderData();
    this.updateCount();

  }

  ngOnInit(): void {

  }
updateCount(){
  this.assignService.componentMethodCalled$.subscribe((data) => {
      this.getDashboardHeaderData();
  });
}

  getDashboardHeaderData() {
    let params = {
      "class_id": this.classId
    }
    this.service.post('class-material-dashboard-api', params, 1).subscribe(result => {
      
      this.headerData = result
      this.isLoadingBool = false;
    })
  }

  goTotest(){
    this.router.navigate(['/test/test-listing-home']);
  }

  goToAssignment(){
    this.router.navigate(['/assignment/test-assignment-home']);
  }

  goToClassMaterial(){
    this.router.navigate(['/class-material/assignment-detail']);
  }

  
}
