import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { UtilService } from '../../providers/util.service';

@Component({
  selector: 'app-sample04',
  templateUrl: './sample04.component.html',
  styleUrls: ['./sample04.component.css']
})

export class Sample04Component implements OnInit {
  allCourseList: any = [];
  isShow: boolean = false;
  editForm: boolean = false;
  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 5;
  courseName: any;
  isLoadingBool: boolean = true;

  allCategories:any='';
  constructor(public router: Router, public util: UtilService, public service: SharedServiceService, public formBuilder: FormBuilder) {
    this.getAllCoursesList();
  }

  ngOnInit(): void {
  }

  handlePageChange(event): void {
    this.page = event;
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

  isCheckClicked(event) {
    console.log('isclicked', event.target.checked);
    if (event.target.checked == true) {
      this.editForm = true;
    }
    if (event.target.checked == false) {
      this.editForm = false;
    }
  }

  viewMore(courseList) {
    console.log('courseList', courseList)
  }

  getSort() {
    this.allCourseList.sort((a, b) => a.field_level.localeCompare(b.field_level));
    console.log(this.allCourseList)
  }

  public doFilter = (value: string) => {
    this.allCourseList.filter = value.trim().toLocaleLowerCase();
    console.log('this.allCourseList.filter', this.allCourseList.filter)
    var searchText = value.trim().toLocaleLowerCase();

    return this.allCourseList.filter(it => {
      return it.toLocaleLowerCase().includes(searchText);
    });
  }

  // get all courses list
  getAllCoursesList() {
    this.isLoadingBool = true;
    this.service.post('view-all-courses-api', '', 1).subscribe(result => {
      this.isLoadingBool = false;
      console.log('result', result)
      if (result['status'] == 1) {
        const { tutorials, totalItems } = result['coursesdata'];
        this.allCourseList = result['coursesdata'];
        this.tutorials = tutorials;
        this.count = totalItems;
      }
      else {
        this.util.errorAlertPopup(result['mesaage']);
      }

    })
  }

  editCourses() {
    this.editForm = true;
  }

  getCourseName(courseName) {
    console.log('courseName', courseName);
    if (courseName == '') {
      return
    }
    else {
      let params = {
        step: 1,
        coursename: courseName
      }
      this.isLoadingBool = true;
      this.service.post('create-course-api', params, 1).subscribe(result => {
        this.isLoadingBool = false;
        console.log('result', result)
        if (result['status'] == 1) {
          console.log('result+++))',result['categories'])
          this.allCategories=result['categories'];
        }
        else {
          this.util.errorAlertPopup(result['mesaage']);
        }
      })
    }
  }
}