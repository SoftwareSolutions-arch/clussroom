import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reorder-screen',
  templateUrl: './reorder-screen.component.html',
  styleUrls: ['./reorder-screen.component.css']
})
export class ReorderScreenComponent implements OnInit {
  isLoadingBool: boolean = false;
  testId: any = '';
  classId: any = '';
  allData: any = [];
  headerData: any = '';
  testAllData: any = '';
  selectedTestDetails: any = "";

  constructor(public service: SharedServiceService,private toastr: ToastrService,  public util: UtilService, private router: Router) {
    this.testId = localStorage.getItem('test_id');
    this.classId = localStorage.getItem('classListId');
    this.getTestListing();
    this.getAllQuestion();
  }

  ngOnInit() {
  }

  // get all courses list
  getAllQuestion() {
    let params = {
      "test_id": this.testId
    }
    this.service.post('questions-list-api', params, 1).subscribe(result => {
      console.log('result', result);
      this.isLoadingBool = false;
      if (result.question_data = "No Question Available") {
        this.toastr.error(result.question_data);
      }
      else {
        this.allData = result.question_data;
      }
    })
  }
  // get test listing data
  getTestListing() {
    this.isLoadingBool = true;
    let params = {
      "class_id": this.classId
    }

    this.service.post('test-list-api', params, 1).subscribe(result => {
      this.testAllData = result.test_data
      this.isLoadingBool = false;
    })
  }

  onChange() {
    localStorage.setItem('test_id', this.selectedTestDetails.test_id);
    this.isLoadingBool = true;
    let params = {
      "test_id": this.selectedTestDetails.test_id
    }
    this.service.post('questions-list-api', params, 1).subscribe(result => {
      console.log('resut', result);
      this.isLoadingBool = false;
      this.allData = result.question_data;
      // this.questionSequence = result.question_sequence
      this.isLoadingBool = false;
    })
  }

}
