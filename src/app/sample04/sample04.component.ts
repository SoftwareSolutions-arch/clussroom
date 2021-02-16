import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;

  allCourseList: any = [];
  isShow: boolean = false;
  editForm: boolean = false;
  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 10;
  courseName: any;
  isLoadingBool: boolean = true;
  isCourseAdded: boolean = false;
  isLevelAdded: boolean = false;
  isBandingAdded: boolean = false;
  isEditable: boolean = true;
  isSaveCourses: boolean = false;
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
  indexesValue: any = '';
  userIdDetails: any = '';

  courseList = { title: '', field_category: '', field_level: '', field_banding: '', classes: '', total_learners: '', field_sub_level: '' };

  showInputCategory: boolean = true;
  showFiledLevel: boolean = true;
  showBanding: boolean = true;

  constructor(public router: Router, public util: UtilService, public service: SharedServiceService,
    public formBuilder: FormBuilder) {
    this.getAllCoursesList();
    this.getallListingDropdown();
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
  isCheckClicked(event, courseList, i) {
    if (event.target.checked == true) {
      this.editForm = true;
      // this.selectedItems.push({ 'nid': courseList.nid })
      this.selectedItems.push(courseList.nid)

    }
    console.log('this.selectedItems11', this.selectedItems)
    if (event.target.checked == false) {
      // this.indexesValue=[];
      this.selectedItems = this.selectedItems.filter(
        book => book != courseList.nid);
      // book => book.nid != courseList.nid);
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
    if (this.selectedItems.length > 1) {
      this.util.errorAlertPopup("Please select only one row for edit")
      return
    }
    else {
      this.selectedItems.forEach(element => {
        // this.userIdDetails = element.nid
        this.userIdDetails = element
        console.log(element, 'element++')
      });
      this.editForm = false;
      this.isSaveCourses = true;
      this.showInputCategory = true;
    }
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

  // filter course 
  filerCourseArray() {
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

  cancelCourses() {
    this.getAllCoursesList();
    this.isSaveCourses = false;
    this.editForm = false;
    this.userIdDetails = '';
    this.selectedItems = []
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.showInputCategory = true;
    this.showFiledLevel = true;
    this.showBanding = true;
  }

  getallListingDropdown() {
    let params = {
      "step": 1
    }
    this.service.post('create-course-api', params, 1).subscribe(result => {
      console.log("result", result);
      this.allCategories = result['categories'];
      this.allLevel = result['level'];
      this.allBanding = result['banding'];
    })
  }

  addNewcategory(index: number): any {
    console.log('value', index)
    if (index['field_category'] == 'create_new') {
      index['field_category'] = ''
      this.showInputCategory = false;
    }
    else if (index['field_level'] == 'create_new') {
      index['field_level'] = ''
      this.showFiledLevel = false;
    }
    else if (index['field_banding'] == 'create_new') {
      index['field_banding'] = ''
      this.showBanding = false;
    }

  }

  compareFn(a, b) {
    console.log('a', a)
    console.log('b', b);
    console.log(a, b, a && b && a.num == b.num);
    return a && b && a.num == b.num;
  }

  saveCourses(index: number): any {
    let params = {
      "coursename": index['title'],
      "course_category": index['field_category'],
      "sub_category": index['field_sub_category'],
      "level": index['field_level'],
      "sub_level": index['field_sub_level'],
      "sub_banding": index['field_sub_banding'],
      "banding": index['field_banding'],
      "courseid": index['nid']
    }

    this.isLoadingBool = true;
    this.service.post('update-course-api', params, 0).subscribe(result => {
      console.log("result", result);
      if (result['Status'] == 1 || '1') {
        this.isLoadingBool = false;
        this.isSaveCourses = false;
        this.editForm = false;
        this.userIdDetails = '';
        this.selectedItems = []
        this.checkboxes.forEach((element) => {
          element.nativeElement.checked = false;
        });
        this.deleteclosebutton.nativeElement.click();
        this.util.showSuccessAlert('Course Updated Successfully');
        this.getAllCoursesList();
      }
    })
  }

  // search api
  serchCoursesList() {
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
}