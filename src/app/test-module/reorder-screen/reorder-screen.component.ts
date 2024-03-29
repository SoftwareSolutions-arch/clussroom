import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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
  question_sequence: any = [];
  test_name:any='';
  constructor(public service: SharedServiceService, private toastr: ToastrService, public util: UtilService, private router: Router) {
    this.testId = localStorage.getItem('test_id');
    this.classId = localStorage.getItem('classListId');
    this.test_name = localStorage.getItem('test_name');
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
      
      this.isLoadingBool = false;
      if (result.question_data.length > 0) {
        this.allData = result.question_data;
      }
      else {
        this.toastr.error(result.question_data);
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
    this.allData = [];
    localStorage.setItem('test_name',this.selectedTestDetails.test_name)
    localStorage.setItem('test_id', this.selectedTestDetails.test_id);
    this.isLoadingBool = true;
    let params = {
      "test_id": this.selectedTestDetails.test_id
    }
    this.service.post('questions-list-api', params, 1).subscribe(result => {
      this.test_name=localStorage.getItem('test_name');
      this.isLoadingBool = false;
      if (result.question_data.length > 0) {
        this.allData = result.question_data;
      }
      else {
        this.toastr.error(result.question_data);
      }
    })
  }

  settingsClicked() {
    this.router.navigate(["/test/settings-tabs"]);
  }

  goToTestAssessment() {
    this.router.navigate(['/test/test-assessment']);
  }

  drop(event: CdkDragDrop<string[]>) {
    this.question_sequence = [];
    moveItemInArray(this.allData, event.previousIndex, event.currentIndex);
    this.allData.forEach(element => {
      this.question_sequence.push(element.question_id);
    });
  }

  confirmEdit() {
    let params = {
      'test_id': this.testId,
      'question_sequence': this.question_sequence
    }
    
    this.service.post('reorder-all-questions-api', params, 1).subscribe(result => {
      this.isLoadingBool = false;
      
      this.toastr.success(result.message);
      this.router.navigate(['/test/question-screen']);
    })
  }
}
