import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassesComponent } from 'src/app/classes/classes.component';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';

@Component({
  selector: 'app-zoom-sidebar',
  templateUrl: './zoom-sidebar.component.html',
  styleUrls: ['./zoom-sidebar.component.css']
})
export class ZoomSidebarComponent implements OnInit {
  constructor(public classes: ClassesComponent, public util: UtilService, public service: SharedServiceService, public router: Router) { 
    // this.ngOnInit();
    jQuery(".sidebar-blue").toggleClass("toogleopen");
    jQuery(".control-panel").toggleClass("toogleopen").removeClass("dashboardtoogleopen").removeClass("dashboardtoogleclose");
    jQuery(".sidebar-dashboard .dashboard-user-sidebar").removeClass("dashboardtoogleopen").removeClass("dashboardtoogleclose");

  }

  ngOnInit(): void {
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

  getCourses() {
    // this.classes.getAllCoursesList();
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

  goToTestListing(){
    this.router.navigate(['/test-listing'])
  }
}
