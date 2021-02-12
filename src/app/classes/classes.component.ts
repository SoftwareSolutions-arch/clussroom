import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UtilService } from '../../providers/util.service';
import { SharedServiceService } from '../shared-service.service';
@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  // @ViewChild('addclosebuttons') addclosebuttons;
  @ViewChild('addclosebuttons') addclosebuttons: ElementRef;

  isLoadingBool: boolean = true;
  allCourseList: any = [];
  allClassesData: any = [];

  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 10;
  isTableShow: boolean = false;
  editForm: boolean = false;
  isSaveCourses: boolean = false;

  selectedCategory: any;
  selectedItems = [];

  courseList = { class_start: '', class_end: '', class_name: '' };

  constructor(public util: UtilService, public service: SharedServiceService) {
    this.getAllCoursesList();
  }

  ngOnInit(): void {
  }

  // get all courses list
  getAllCoursesList() {
    this.isLoadingBool = true;
    this.service.post('view-all-courses-api', '', 1).subscribe(result => {
      this.isLoadingBool = false;
      if (result['status'] == 1) {
        this.allCourseList = result['coursesdata'];
      }
      else {
        this.util.errorAlertPopup(result['mesaage']);
      }
    })
  }

  selectCategory() {
    this.viewClassesList();
  }

  // view classes
  viewClassesList() {
    let params = {
      "course_id": this.selectedCategory
    }
    this.isLoadingBool = true;
    this.service.post('view-all-classes-api', params, 1).subscribe(result => {
      console.log('result++p', result)
      this.isLoadingBool = false;
      if (result['status'] == 1) {
        this.allClassesData = result['classesdata'];
        if (result['classesdata'].length > 0) {
          this.isTableShow = true;
        }
        if (result['classesdata'].length == 0) {
          this.isTableShow = false;
        }
      }
      else {
        this.util.errorAlertPopup(result['mesaage']);
      }
    })
  }

  // handling page events
  handlePageChange(event): void {
    this.page = event;
  }

  // get events of check box for edit or add button show and hide 
  isCheckClicked(event, courseList, i) {
    if (event.target.checked == true) {
      this.editForm = true;
      // this.selectedItems.push({ 'nid': courseList.nid })
      // this.selectedItems.push(courseList.nid)

    }
    // console.log('this.selectedItems11',this.selectedItems)
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

  next() {
    let params = {
      "startdate": this.courseList.class_start,
      "enddate": this.courseList.class_end,
      "class_name": this.courseList.class_name,
      "course_id": this.selectedCategory
    }
    console.log('classList', params)
    this.isLoadingBool = true;
    this.service.post('create-class-api', params, 1).subscribe(result => {
      this.isLoadingBool = false;

      if (result['status'] == "completed") {
        this.util.showSuccessAlert('Course Created Successfully');
        this.viewClassesList();
      }
      else {
        this.util.errorAlertPopup(result['mesaage']);
      }
    })
  }
}