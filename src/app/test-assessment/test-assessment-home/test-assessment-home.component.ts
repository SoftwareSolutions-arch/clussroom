import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from '../../shared-service.service';
import { UtilService } from '../../../providers/util.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-test-assessment-home',
  templateUrl: './test-assessment-home.component.html',
  styleUrls: ['./test-assessment-home.component.css']
})
export class TestAssessmentHomeComponent implements OnInit {
  @ViewChild('deleteclosebutton') deleteclosebutton;
  assignmentData: any;
  testId: any;
  isEditClicked: boolean = false;
  page = 1;
  constructor( private router: Router, private service: SharedServiceService, private util: UtilService, private toster: ToastrService) { }

  ngOnInit() {
    this.getAssignmentData();
  }
    // handling page events
    handlePageChange(event): void {
      this.page = event;
    }
   getAssignmentData(){
     const data = {
      "class_id":localStorage.getItem('classListId') 
     }
     this.service.post('listing-assignment',data,1).subscribe(res => {
       this.assignmentData = res.assignment_data
     })
   }
     // get events of check box for edit or add button show and hide 
  isCheckBoxClicked(testListing, i) {
    this.isEditClicked=true;
    this.testId = testListing.assignment_id;
  }
  goToTest() {
    this.router.navigate(['/assignment/add-assignment'], { queryParams: { id: this.testId} });
  }

  deleteAssignment(){
    const data = {
      assignment_id : this.testId
    }
    this.service.post('delete-assignment-api',data,1).subscribe(res => {
      if(res.success_message === "Deleted Successfully"){
        this.deleteclosebutton.nativeElement.click();
        this.getAssignmentData();
      }
    })
  }
}
