import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import { UtilService } from '../../providers/util.service';
@Component({
  selector: 'app-sample04',
  templateUrl: './sample04.component.html',
  styleUrls: ['./sample04.component.css']
})

export class Sample04Component implements OnInit {
  @ViewChild('deleteclosebutton') deleteclosebutton;
  @ViewChild('addclosebutton') addclosebutton;

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
  isCourseAdded: boolean = false;
  isLevelAdded: boolean = false;
  isBandingAdded: boolean = false;
  isEditable: boolean = true;
  allCategories: any = '';
  allLevel: any = '';
  allBanding: any = '';
  selectedCategory: any;
  level: any;
  banding: any;
  newCategory: any = '';
  newLevel: any = '';
  newBanding: any = '';
  selectedItems = [];
  constructor(public router: Router, public util: UtilService, public service: SharedServiceService, 
    public formBuilder: FormBuilder) {
    this.getAllCoursesList();
  }

  ngOnInit(): void {
  }

  openClasses() {
    this.router.navigate(['/classes']);
  }

  // handling page events
  handlePageChange(event): void {
    this.page = event;
  }

  // handling page size
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

  // get events of check box for edit or add button show and hide
  isCheckClicked(event, courseList) {
    if (event.target.checked == true) {
      this.editForm = true;
      this.selectedItems.push(courseList.nid)
    }
    // console.log('this.selectedItems11',this.selectedItems)
    if (event.target.checked == false) {
      this.selectedItems = this.selectedItems.filter(
        book => book != courseList.nid);
      if (this.selectedItems.length == 0) {
        this.editForm = false;
      }
    }
  }

  getSort() {
    // this.allCourseList.sort((a, b) => a.field_level.localeCompare(b.field_level));
    // console.log(this.allCourseList)
  }

  // get all courses list
  getAllCoursesList() {
    console.log(localStorage.getItem('csrftoken'))
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

  // edit course details 
  editCourses() {
    // this.editForm = true;
    this.allCourseList.forEach(element => {
      if (this.selectedItems == element.field_course_code) {
        console.log('hello user', this.selectedItems)
        console.log('hello user', element.field_course_code)
        this.isEditable = false;
      }
    });
  }

  // send course name to get all required details
  postCourseName(courseName) {
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
          this.allCategories = result['categories'];
          this.allLevel = result['level'];
          this.allBanding = result['banding'];
        }
        else {
          this.util.errorAlertPopup(result['mesaage']);
        }
      })
    }
  }

  // get categories details in drop down menu
  getCategory() {
    if (this.selectedCategory == 'create_new') {
      this.isCourseAdded = true;
    }
    else {
      this.isCourseAdded = false;
    }
  }

  // get level details in drop down menu
  getLevel() {
    if (this.level == 'create_new') {
      this.isLevelAdded = true;
    }
    else {
      this.isLevelAdded = false;
    }
  }

  // get banding details in drop down menu
  getBanding() {
    if (this.banding == 'create_new') {
      this.isBandingAdded = true;
    }
    else {
      this.isBandingAdded = false;
    }
  }

  // create new courses
  createCourse() {
    if (this.banding == undefined || this.level == undefined || this.selectedCategory == undefined) {
      this.util.errorAlertPopup('please fill all the required value')
    }

    else {
      this.isLoadingBool = true;
      let params = {
        "step": "2",
        "coursename": this.courseName,
        "course_category": this.selectedCategory,
        "level": this.level,
        "banding": this.banding,
        "new_banding": this.newBanding,
        "new_category": this.newCategory,
        "new_level": this.newLevel
      }
      this.service.post('create-course-api', params, 1).subscribe(result => {
        this.isLoadingBool = false;
        this.addclosebutton.nativeElement.click();
        this.getAllCoursesList();
      })
    }
  }

  // delete single or multiple course
  deleteCourse() {
    let params = {
      "delete_course_nids": this.selectedItems
    }
    this.isLoadingBool = true;
    this.service.post('delete-course-api', params, 1).subscribe(result => {
      this.selectedItems = [];
      this.editForm = false;
      this.deleteclosebutton.nativeElement.click();
      this.util.showSuccessAlert('Course Deleted Successfully');
      this.isLoadingBool = false;
      this.getAllCoursesList();
    })
  }
}