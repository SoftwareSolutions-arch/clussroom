import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../../providers/util.service';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-admin-vendor',
  templateUrl: './admin-vendor.component.html',
  styleUrls: ['./admin-vendor.component.css']
})
export class AdminVendorComponent implements OnInit {
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
  selectedCategory: any = "MCA";

  email: any = '';
  levelName: any = '';
  bandingId: any = '';
  userId: any = '';
  editData: any = '';

  edit_permission:any = {
  }

  @ViewChild('editAdminPopup') private editAdminPopup: ElementRef;

  constructor(public router: Router, public service: SharedServiceService, public util: UtilService,) {
    this.instructionName = localStorage.getItem('instructionName');
    this.userId = localStorage.getItem("uid");
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
    this.router.navigate(['/zoom-home']);
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
    let params = {
      "vendor_id": this.userId
    }
    this.service.post('vendor-admin-listing-api', params, 1).subscribe(result => {
      
      this.adminData = result;
      this.isLoadingBool = false;
    })
  }

  isClicked(adminList) {
    
    this.editData = adminList;
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

  classCreation(event) {
    
    this.edit_permission.class_creation = event.target.checked;
  }

  addLearner(event) {
    
    this.edit_permission.add_learner = event.target.checked
  }

  mainLibrary(event) {
    
    this.edit_permission.main_library = event.target.checked
  }

  fileUpload(event) {
    this.edit_permission.file_upload = event.target.checked
  }

  classDeletion(event) {
    this.edit_permission.class_deletion = event.target.checked
  }

  liveSession(event) {
    this.edit_permission.live_session = event.target.checked
  }

  courseCreation(event) {
    this.edit_permission.course_creation = event.target.checked
  }

  // save details for edit admins
  editAdmin() {
    
    let params = {
      'id': this.userId,
      "email": this.editData.email,
      "course_id": this.editData.course_name[0].course_id,
      "p_id": this.editData.permissions_data[0].p_id,
      "add_learner": (this.edit_permission.add_learner == true) ? "1" : "0",
      "main_library": (this.edit_permission.main_library == true) ? "1" : "0",
      "course_library": (this.edit_permission.file_upload == true) ? "1" : "0",
      "live_session":(this.edit_permission.live_session == true) ? "1" : "0",
      "course_creation":(this.edit_permission.course_creation == true) ? "1" : "0",
      "class_creation": (this.edit_permission.class_creation == true) ? "1" : "0",
      "class_delation": (this.edit_permission.class_deletion == true) ? "1" : "0",
    }
    
    this.isLoadingBool = true;
    this.service.post('edit-vendor-admin-api', params, 1).subscribe(result => {
      this.isLoadingBool = false;
      this.util.showSuccessToast('Update successfully');
      this.editAdminPopup.nativeElement.click();
      this.viewAllAdminSection();
    })

  }
}
