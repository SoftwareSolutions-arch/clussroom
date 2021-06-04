import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-midterm-preview',
  templateUrl: './midterm-preview.component.html',
  styleUrls: ['./midterm-preview.component.css']
})
export class MidtermPreviewComponent implements OnInit {
  isLoadingBool: boolean = false;
  testId: any = '';
  classId: any = '';
  allData: any = [];
  testAllData: any = '';
  selectedTestDetails: any = "";
  constructor(public service: SharedServiceService, public formBuilder: FormBuilder, private toastr: ToastrService, public util: UtilService, private router: Router) {
    this.testId = localStorage.getItem('test_id');
    this.classId = localStorage.getItem('classListId');
    this.getTestListing();
    this.getAllQuestion();
  }

  ngOnInit(): void {
  }

  nextPage() {
    this.router.navigate(['/test/midterm-preview-2']);
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

  // get all courses list
  getAllQuestion() {
    this.allData = [];
    let params = {
      "test_id": this.testId
    }
    this.service.post('questions-list-api', params, 1).subscribe(result => {
      
      this.isLoadingBool = false;
      if (result.question_data.length > 0) {
        this.allData = result.question_data;
        // this.questionSequence = result.question_sequence
      }
      else {
        this.toastr.error(result.question_data);
      }
    })
  }
  
  onChange() {
    this.allData = [];
    localStorage.setItem('test_id', this.selectedTestDetails.test_id);
    this.isLoadingBool = true;
    let params = {
      "test_id": this.selectedTestDetails.test_id
    }
    this.service.post('questions-list-api', params, 1).subscribe(result => {
      this.isLoadingBool = false;
      if (result.question_data.length > 0) {
        this.allData = result.question_data;
        // this.questionSequence = result.question_sequence
      }
      else {
        this.toastr.error(result.question_data);
      }
    })
  }

  homeQuestion(){
    this.router.navigate(['/test/question-screen']);
  }
}
