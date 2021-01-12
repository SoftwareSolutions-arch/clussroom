import { Component, OnInit } from '@angular/core';
// import '../sidebar/sidebar.component.js';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor() { }

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
}
