import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../../providers/util.service';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isLoadingBool: boolean = false;
  instructionName: any = '';

  allCategories: any = '';
  allLevel: any = '';
  allBanding: any = '';
  adminData: any = '';

  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 10;

  adminDataList: any = '';
  allClassesData: any = '';

  classFieldData: any = '';
  allCourseList: any = '';
  selectedCategory: any = '';

  email: any = '';
  levelName: any = '';
  bandingId: any = '';
  constructor(public router: Router, public service: SharedServiceService, public util: UtilService,) {
    this.instructionName = localStorage.getItem('instructionName');
    this.getallListingDropdown();
    this.viewAllAdminSection();
    this.getAllCoursesList();
  }

  ngOnInit(): void {
  }

  goToclasses() {
    this.router.navigate(['/classes']);
  }

  goToCourses() {
    this.router.navigate(['/sample04']);
  }

  goToClassList() {
    this.router.navigate(['/classes-list']);
  }

  goToLearner() {
    this.router.navigate(['/learners']);
  }

  goToStroage() {
    this.router.navigate(['/storage']);
  }

  goToLiveSession() {
    this.router.navigate(['/live-session']);
  }

  // handling page events
  handlePageChange(event): void {
    this.page = event;
  }

  getallListingDropdown() {
    let params = {
      "step": 1
    }
    this.service.post('create-course-api', params, 1).subscribe(result => {
      this.allCategories = result['categories'];
      this.allLevel = result['level'];
      this.allBanding = result['banding'];
    })
  }

  viewAllAdminSection() {
    this.isLoadingBool = true;
    this.service.post('view-all-admins-api', '', 1).subscribe(result => {
      this.adminData = result.coursesdata;
      this.isLoadingBool = false;
    })
  }

  isClicked(adminList) {
    this.adminDataList = adminList;
    this.viewAllCoursesList();
  }

  viewAllCoursesList() {
    let params = {
      "course_id": this.adminDataList.nid
    }

    this.isLoadingBool = true;
    this.service.post('view-all-classes-api', params, 1).subscribe(result => {

      this.isLoadingBool = false;
      if (result['status'] == 1) {
        this.allClassesData = result['classesdata'];
      }
      else {
        this.util.errorAlertPopup(result['message']);
      }
    })
  }

  // get all courses list
  getAllCoursesList() {
    this.isLoadingBool = true;
    this.service.post('view-all-courses-api', '', 1).subscribe(result => {

      this.isLoadingBool = false;
      this.allCourseList = result['coursesdata'];
      if (result['status'] == 1) {
        this.allCourseList = result['coursesdata'];
      }
      else {
        this.util.errorAlertPopup(result['mesaage']);
      }
    })
  }

  // view classes
  viewAllCoursesLists() {
    let params = {
      "course_id": this.selectedCategory.nid
    }
    this.isLoadingBool = true;
    this.service.post('view-all-classes-api', params, 1).subscribe(result => {

      this.isLoadingBool = false;
      if (result['status'] == 1) {
        this.allClassesData = result['classesdata'];
      }
      else {
        this.util.errorAlertPopup(result['message']);
      }
    })
  }

  getCHeckBOxData(event) {
    
  }

  // save details for edit admins 
  editAdmin() {
    
    
    
    
    
  }
}