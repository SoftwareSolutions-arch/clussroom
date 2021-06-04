import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../../../providers/util.service';
import { SharedServiceService } from '../../shared-service.service';
@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent implements OnInit {
  isLoadingBool: boolean = true;
  selectCourse: any = '';
  allClassesData: any = [];
  allCourseList: any = [];
  dashBoardData: any = [];
  classId: any = '';
  headerData: any = '';
  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 10;
  constructor(public service: SharedServiceService, public router: Router, public util: UtilService, private http: HttpClient) {
    this.getClassesListing();
    this.getDashBoardData();
  }
  ngOnInit(): void {
  }

  // get student class listing
  getClassesListing() {
    let params = {
      "user_id": "122"
    }
    this.isLoadingBool = true;
    this.service.post('student-classes-listing', params, 1).subscribe(result => {
      this.isLoadingBool = false;
      this.allCourseList = result.result;
    })
  }

  // get student class listing
  getDashBoardData() {
    let params = {
      "user_id": "122"
    }
    this.isLoadingBool = true;
    this.service.post('student-dashboard', params, 1).subscribe(result => {
      console.log('dashbaord--data--', result);
      this.isLoadingBool = false;
      this.dashBoardData = result.result
    })
  }

  // handling page events
  handlePageChange(event): void {
    this.page = event;
  }

  getHeaderData() {
    let params = {
      "class_id": this.selectCourse.classes_id
    }
    this.isLoadingBool = true;
    this.service.post('class-material-dashboard-api', params, 1).subscribe(result => {
      console.log('result', result);
      this.headerData = result;
      this.isLoadingBool = false;
    })
  }
}
