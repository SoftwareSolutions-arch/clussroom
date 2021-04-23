import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { UtilService } from '../../providers/util.service';
import { SharedServiceService } from '../shared-service.service';
import * as $ from "jquery";
import { Router } from '@angular/router';


@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  @ViewChild('deleteclosebutton') deleteclosebutton;
  @ViewChild('closeModal') private closeModal: ElementRef;
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;

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
  classesData: any = {};
  userIdDetails: any = '';
  showInputCategory: boolean = true;
  isClassEdited: boolean = true;
  selectedNewItems: any = '';
  instructionName: any = '';

  constructor(public util: UtilService, public router: Router, public service: SharedServiceService) {
    this.getAllCoursesList();
    this.instructionName = localStorage.getItem('instructionName')
  }

  ngOnInit(): void {
    // jQuery(document).ready(function () {
    //   jQuery(document).on("click", ".sidebar-blue .sidebar-menu .sidebar-bar .sidebar-bar-nav", function () {
    //     // jQuery(".sidebar-blue .sidebar-menu .sidebar-bar .sidebar-bar-nav").click(function(){
    //     jQuery(".sidebar-blue").toggleClass("toogleopen");
    //     jQuery(".control-panel").toggleClass("toogleopen").removeClass("dashboardtoogleopen").removeClass("dashboardtoogleclose");
    //     jQuery(".sidebar-dashboard .dashboard-user-sidebar").removeClass("dashboardtoogleopen").removeClass("dashboardtoogleclose");
    //   });

    //   jQuery(document).on("click", ".sidebar-blue .panel-collapse li a", function () {
    //     // jQuery(".sidebar-blue .panel-collapse li a").click(function(){
    //     jQuery(".sidebar-blue").removeClass("toogleopen");
    //     jQuery(".control-panel").removeClass("toogleopen").addClass("dashboardtoogleopen");
    //     jQuery(".sidebar-dashboard .dashboard-user-sidebar").removeClass("dashboardtoogleclose");
    //     jQuery(".sidebar-dashboard .dashboard-user-sidebar").addClass("dashboardtoogleopen");
    //   });

    //   jQuery(document).on("click", ".dashboard-user-sidebar.dashboardtoogleopen .user-details-dash .course-sidebar", function () {
    //     // jQuery(".dashboard-user-sidebar.dashboardtoogleopen .user-details-dash .course-sidebar").click(function(){
    //     jQuery(".sidebar-dashboard .dashboard-user-sidebar").removeClass("dashboardtoogleopen").addClass("dashboardtoogleclose");
    //     jQuery(".control-panel").removeClass("dashboardtoogleopen").addClass("dashboardtoogleclose").addClass("toogleopen");
    //     jQuery(".sidebar-blue").toggleClass("toogleopen");
    //   });

    //   jQuery(document).on("click", ".dashboard-user-sidebar.dashboardtoogleclose .user-details-dash .course-sidebar", function () {

    //     // jQuery(".dashboard-user-sidebar.dashboardtoogleclose .user-details-dash .course-sidebar").click(function(){
    //     jQuery(".sidebar-dashboard .dashboard-user-sidebar").removeClass("dashboardtoogleclose").addClass("dashboardtoogleopen");
    //     jQuery(".control-panel").removeClass("toogleopen");
    //     jQuery(".sidebar-blue").removeClass("toogleopen");
    //   });
    // });
  }

  ngAfterViewInit() { }

  // get all courses list
  getAllCoursesList() {
    this.isLoadingBool = true;
    this.service.post('view-all-courses-api', '', 1).subscribe(result => {
      this.isLoadingBool = false;
      this.allCourseList = result['coursesdata'];
      // if (result['status'] == 1) {
      //   this.allCourseList = result['coursesdata'];
      // }
      // else {
      //   this.util.errorAlertPopup(result['mesaage']);
      // }
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

      this.isLoadingBool = false;
      if (result['status'] == 1) {
        this.allClassesData = result['classesdata'];
        this.isTableShow = true;
        // if (result['classesdata'].length > 0) {
        //   this.isTableShow = true;
        // }
        // if (result['classesdata'].length == 0) {
        //   this.isTableShow = false;
        // }
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
      this.selectedItems.push(courseList.nid)
      this.selectedNewItems = courseList.nid

    }
    // 
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

  // create new classes
  createNewClasses() {


    var x = new Date(this.courseList.class_start);
    var y = new Date(this.courseList.class_end);

    if (this.courseList.class_start == '' || this.courseList.class_end == '' || this.courseList.class_name == '') {
      this.util.errorAlertPopup('You must have to fill all the required values');
      return

    }

    else if (x > y) {
      this.util.errorAlertPopup('start date should be less than end date');
      return
    }

    else if (x <= y) {
      let params = {
        "startdate": this.courseList.class_start,
        "enddate": this.courseList.class_end,
        "class_name": this.courseList.class_name,
        "course_id": this.selectedCategory
      }


      this.isLoadingBool = true;
      this.service.post('create-class-api', params, 1).subscribe(result => {

        this.isLoadingBool = false;
        this.clearAddClassValues();
        if (result['status'] == "completed" || "ongoing") {
          this.util.showSuccessAlert('Class created successfully');
          this.viewClassesList();
        }
        else {
          this.util.errorAlertPopup(result['mesaage']);
        }
      })
    }
  }

  // delete class pop up for confirm details
  popDeleteClass() {
    let params = {
      "step": 1,
      "delete_class_nids": [this.selectedNewItems]
    }

    this.service.post('delete-class-api', params, 1).subscribe(result => {

      this.classesData = result.classesdata;

    })
  }

  // final delete for classes
  proceedToDelete() {
    let params = {
      "step": 2,
      "delete_class_nids": [this.selectedNewItems]
    }
    this.service.post('delete-class-api', params, 1).subscribe(result => {
      this.closeModal.nativeElement.click();
      if (result['status'] == '1') {
        this.selectedItems = [];
        this.editForm = false;
        this.util.showSuccessAlert('Class deleted successfully');
        this.viewClassesList();
      }
    })
  }

  // edit course details 
  editCourses() {
    this.selectedItems.forEach(element => {
      this.userIdDetails = element
    });
    this.isClassEdited = false;
    this.editForm = false;
    this.isSaveCourses = true;
    this.showInputCategory = true;
  }

  // cancel course details 
  cancelCourses() {
    this.viewClassesList();
    this.isSaveCourses = false;
    this.editForm = false;
    this.isClassEdited = true;
    this.userIdDetails = '';
    this.selectedItems = []
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.showInputCategory = true;
  }

  // update class
  updateClasses(data): any {

    var x = new Date(data['field_start_date']);
    var y = new Date(data['field_end_date']);
    if (x > y) {
      this.util.errorAlertPopup('start date should be less than end date')
    }
    else if (x <= y) {
      let params = {
        "class_name": data['title'],
        "classid": data['nid'],
        "startdate": data['field_start_date'],
        "enddate": data['field_end_date'],
      }

      this.isLoadingBool = true;
      this.service.post('update-class-api', params, 1).subscribe(result => {

        if (result['Status'] == 1 || '1') {
          this.isLoadingBool = false;
          this.isSaveCourses = false;
          this.editForm = false;
          this.userIdDetails = '';
          this.selectedItems = []
          this.checkboxes.forEach((element) => {
            element.nativeElement.checked = false;
          });
          // this.deleteclosebutton.nativeElement.click();
          this.util.showSuccessAlert('Classes Updated Successfully');
          this.viewClassesList();
        }
      })
    }


  }

  // clear all form values 
  clearAddClassValues() {
    this.courseList.class_start = '';
    this.courseList.class_end = '';
    this.courseList.class_name = '';
  }

  // do logout setup
  logOut() {
    this.service.post('user-logout-api', '', 0).subscribe(result => {

      if (result['status'] == 1) {
        this.util.showSuccessAlert(result['status_message']);
        localStorage.removeItem('csrftoken');
        localStorage.removeItem('uid');
        localStorage.removeItem('userMail');
        localStorage.removeItem('isLogin');
        // this.router.navigate(['/login']);
      }
      else {
        this.util.errorAlertPopup(result['status_message']);
      }
    })
  }

  // navigate to courses tab
  goToCourses() {
    this.router.navigate(['/sample04']);
  }

  goToClassList() {
    this.router.navigate(['/classes-list']);
  }

  goToLearners() {
    this.router.navigate(['/learners']);
  }

  goToStorage() {
    this.router.navigate(['/storage']);
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }

  // go to live sessions
  goToLiveSession() {
    this.router.navigate(['/live-session']);
  }

  goToClasses(classList) {
    this.router.navigate(['/test-listing'],{state:{data:classList.nid}})
  }
}