import { Component, OnInit } from '@angular/core';
import { ClassesComponent } from '../classes/classes.component';
import { SharedServiceService } from '../shared-service.service';
import { UtilService } from '../../providers/util.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  allCourseList: any = '';
  constructor(public classes: ClassesComponent, public util: UtilService, public service: SharedServiceService, public router: Router) {
    // this.ngOnInit();
  }

  ngOnDestroy() {
    jQuery(".sidebar-blue").toggleClass("toogleopen");
    jQuery(".control-panel").toggleClass("toogleopen").removeClass("dashboardtoogleopen").removeClass("dashboardtoogleclose");
    jQuery(".sidebar-dashboard .dashboard-user-sidebar").removeClass("dashboardtoogleopen").removeClass("dashboardtoogleclose");
  }

  ngOnInit(): void {
    this.getAllCoursesList();
    jQuery(document).ready(function () {
      jQuery(document).on("click", ".sidebar-blue .sidebar-menu .sidebar-bar .sidebar-bar-nav", function () {
        // jQuery(".sidebar-blue .sidebar-menu .sidebar-bar .sidebar-bar-nav").click(function(){
        jQuery(".sidebar-blue").toggleClass("toogleopen");
        jQuery(".control-panel").toggleClass("toogleopen").removeClass("dashboardtoogleopen").removeClass("dashboardtoogleclose");
        jQuery(".sidebar-dashboard .dashboard-user-sidebar").removeClass("dashboardtoogleopen").removeClass("dashboardtoogleclose");
      });

      jQuery(document).on("click", ".sidebar-blue .panel-collapse li a", function () {
        // jQuery(".sidebar-blue .panel-collapse li a").click(function(){
        jQuery(".sidebar-blue").removeClass("toogleopen");
        jQuery(".control-panel").removeClass("toogleopen").addClass("dashboardtoogleopen");
        jQuery(".sidebar-dashboard .dashboard-user-sidebar").removeClass("dashboardtoogleclose");
        jQuery(".sidebar-dashboard .dashboard-user-sidebar").addClass("dashboardtoogleopen");
      });

      jQuery(document).on("click", ".dashboard-user-sidebar.dashboardtoogleopen .user-details-dash .course-sidebar", function () {
        // jQuery(".dashboard-user-sidebar.dashboardtoogleopen .user-details-dash .course-sidebar").click(function(){
        jQuery(".sidebar-dashboard .dashboard-user-sidebar").removeClass("dashboardtoogleopen").addClass("dashboardtoogleclose");
        jQuery(".control-panel").removeClass("dashboardtoogleopen").addClass("dashboardtoogleclose").addClass("toogleopen");
        jQuery(".sidebar-blue").toggleClass("toogleopen");
      });

      jQuery(document).on("click", ".dashboard-user-sidebar.dashboardtoogleclose .user-details-dash .course-sidebar", function () {

        // jQuery(".dashboard-user-sidebar.dashboardtoogleclose .user-details-dash .course-sidebar").click(function(){
        jQuery(".sidebar-dashboard .dashboard-user-sidebar").removeClass("dashboardtoogleclose").addClass("dashboardtoogleopen");
        jQuery(".control-panel").removeClass("toogleopen");
        jQuery(".sidebar-blue").removeClass("toogleopen");
      });
    });
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
        this.router.navigate(['/login']);
      }
      else {
        this.util.errorAlertPopup(result['status_message']);
      }
    })
  }

  goToTestListing() {
    this.router.navigate(['/test-listing'])
  }

  goToLibrary() {
    this.router.navigate(['/library/library-home']);
  }

  gotoCalendar() {
    this.router.navigate(['/test/calendar']);
  }

  // get all courses list
  getAllCoursesList() {
    this.service.post('view-all-courses-api', '', 1).subscribe(result => {
      this.allCourseList = result.coursesdata;
    })
  }

  goTocourses(courseLists) {

  }

  goToClassMaterial() {
    this.router.navigate(['/class-material-vendor/main-library']);
  }

  goToClassList() {
    this.router.navigate(['/classes-list']);
  }

  goToPersonalLibrary() {
    this.router.navigate(['/library/personal-library']);
  }

  goToCourseLibrary() {
    this.router.navigate(['/library/course-library']);
  }

  goToMainLibrary() {
    this.router.navigate(['/library/main-library']);
  }

  goToFileTransfer() {
    this.router.navigate(['/library/file-transfer']);
  }

  goToSubAdminList() {
    this.router.navigate(['/admin-sub/admin-home']);
  }

  goToPermissionRight() {
    this.router.navigate(['/admin-sub/admin-home']);
  }

}
