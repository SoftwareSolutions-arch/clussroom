import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';
import { ToastrService } from 'ngx-toastr';
import { param } from 'jquery';
@Component({
  selector: 'app-edit-points-screen',
  templateUrl: './edit-points-screen.component.html',
  styleUrls: ['./edit-points-screen.component.css']
})
export class EditPointsScreenComponent implements OnInit {
  isLoadingBool: boolean = false;
  testId: any = '';
  classId: any = '';
  allData: any = [];
  headerData: any = '';
  testAllData: any = '';
  selectedTestDetails: any = "";
  arrayList:any=[];
  constructor(public service: SharedServiceService, private toastr: ToastrService, public util: UtilService, private router: Router) {
    this.testId = localStorage.getItem('test_id');
    this.classId = localStorage.getItem('classListId');
    this.getTestListing();
    this.getAllQuestion();
  }

  ngOnInit() {
  }

  submit() {
    console.log('allData', this.allData);
  }

  // get all courses list
  getAllQuestion() {
    let params = {
      "test_id": this.testId
    }
    this.service.post('questions-list-api', params, 1).subscribe(result => {
      console.log('result', result);
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
    localStorage.setItem('test_id', this.selectedTestDetails.test_id);
    this.isLoadingBool = true;
    let params = {
      "test_id": this.selectedTestDetails.test_id
    }
    this.service.post('questions-list-api', params, 1).subscribe(result => {
      console.log('resut', result);
      this.isLoadingBool = false;
      if (result.question_data.length > 0) {
        this.allData = result.question_data;
      }
      else {
        this.toastr.error(result.question_data);
      }
    })
  }

  confirmButton() {
    this.isLoadingBool = true;
    this.allData.forEach(element => {
      this.arrayList.push({
        'question_id':element.question_id,
        'question_points':element.points
      })
    });

    let params={
    'id_and_points':this.arrayList
    }
    console.log('this.allData',params);
    this.service.post('edit-all-questions-points-api', params, 1).subscribe(result => {
      this.isLoadingBool = false;
      this.toastr.success(result.message);
      this.router.navigate(['/test/question-screen']);
    })

  }

}
