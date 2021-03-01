import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import { UtilService } from '../../providers/util.service';
import { ClassesComponent } from '../classes/classes.component';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-sample04',
  templateUrl: './sample04.component.html',
  styleUrls: ['./sample04.component.css']
})

export class Sample04Component implements OnInit {
  @ViewChild('deleteclosebutton') deleteclosebutton;
  @ViewChild('addclosebutton') addclosebutton;
  @ViewChild('editclosebutton') editclosebutton;
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;

  @ViewChild('closeModal') private closeModal: ElementRef;
  @ViewChild('closeModal2') private closeModal2: ElementRef;
  @ViewChild('closeModal3') private closeModal3: ElementRef;


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

  courseList: any = {};

  showInputCategory: boolean = true;
  showFiledLevel: boolean = true;
  showBanding: boolean = true;

  editSampleForm: FormGroup;
  error_messages: any = '';
  addCourse2: FormGroup;
  class_start_date: any = '';
  class_end_date: any = '';
  allow_msg_learner: any = ''
  allow_msg_coach: any = '';
  patchCategorieName: any = ''
  patchLevelName: any = '';
  patchBandingName: any = '';
  constructor(public router: Router, public util: UtilService, public service: SharedServiceService,
    public formBuilder: FormBuilder, public classes: ClassesComponent) {
    this.getAllCoursesList();
    this.getallListingDropdown();
    this.setupLoginFormData();
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


  setupLoginFormData() {
    this.error_messages = {
      courseName: [
        { type: "required", message: '*Email is Required' }
      ],
      category: [
        { type: "required", message: '*Email is Required' }
      ],
      level: [
        { type: "required", message: '*Email is Required' }
      ],
      banding: [
        { type: "required", message: '*Email is Required' }
      ],
    };
    this.editSampleForm = this.formBuilder.group(
      {
        courseName: new FormControl("", Validators.compose([Validators.required])),
        category: new FormControl("", Validators.compose([Validators.required])),
        level: new FormControl("", Validators.compose([Validators.required])),
        banding: new FormControl("", Validators.compose([Validators.required])),
        class_start_date_from: new FormControl("", Validators.compose([Validators.required])),
        class_start_date_to: new FormControl("", Validators.compose([Validators.required])),

      }
    )


    this.addCourse2 = this.formBuilder.group(
      {
        class_start_date: new FormControl("", Validators.compose([Validators.required])),
      }
    )

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
    console.log('courseList', courseList)
    if (event.target.checked == true) {
      this.courseList = courseList;
      this.editSampleForm.controls.courseName.setValue(courseList.title);
      this.editSampleForm.controls.category.setValue(courseList.field_category_id);
      this.editSampleForm.controls.level.setValue(courseList.field_level_id)
      this.editSampleForm.controls.banding.setValue(courseList.field_banding_id)
      this.editForm = true;
      // this.selectedItems.push({ 'nid': courseList.nid })
      this.selectedItems.push(courseList.nid)

    }
    if (event.target.checked == false) {
      this.courseList = '';
      // this.indexesValue=[];
      this.selectedItems = this.selectedItems.filter(
        book => book != courseList.nid);
      // book => book.nid != courseList.nid);
      if (this.selectedItems.length == 0) {
        this.editForm = false;
      }
    }
  }

  // get all courses list
  getAllCoursesList() {
    this.isLoadingBool = true;
    this.service.post('view-all-courses-api', '', 1).subscribe(result => {
      this.isLoadingBool = false;
      this.allCourseList = result.coursesdata;
      const { tutorials, totalItems } = result.coursesdata;
      this.tutorials = tutorials;
      this.count = totalItems;
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

  // get categories details in drop down menu
  getCategory() {
    if (this.selectedCategory == 'create_new') {
      this.isCourseAdded = true;
    }
    else {
      this.isCourseAdded = false;
      var items = this.allCategories.filter(
        book => book.tid == this.selectedCategory);
      this.patchCategorieName = items[0].name
    }
  }

  // get level details in drop down menu
  getLevel() {
    if (this.level == 'create_new') {
      this.isLevelAdded = true;
    }
    else {
      this.isLevelAdded = false;
      var items = this.allLevel.filter(
        book => book.tid == this.level);
      this.patchLevelName = items[0].name
      console.log('items', items)
    }
  }

  // get banding details in drop down menu
  getBanding() {
    if (this.banding == 'create_new') {
      this.isBandingAdded = true;
    }
    else {
      this.isBandingAdded = false;
      var items = this.allBanding.filter(
        book => book.tid == this.banding);
      this.patchBandingName = items[0].name
      console.log('items', items)
    }
  }

  // delete single or multiple course
  deleteCourse() {
    let params = {
      "delete_course_nids": this.selectedItems
    }
    this.isLoadingBool = true;
    this.service.post('delete-course-api', params, 1).subscribe(result => {
      // this.classes.ngOnInit();
      this.getAllCoursesList();
      this.selectedItems = [];
      this.editForm = false;
      this.deleteclosebutton.nativeElement.click();
      this.util.showSuccessAlert('Course Deleted Successfully');
      this.isLoadingBool = false;

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

  addNewcategory(index: number): any {

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

  // create new courses
  createCourse() {

    this.isLoadingBool = true;
    let params = {
      "step": "2",
      "coursename": this.courseName,
      "course_category": this.selectedCategory,
      "level": this.level,
      "banding": this.banding,
      "new_banding": this.newBanding,
      "new_category": this.newCategory,
      "new_level": this.newLevel,
      "class_start_date": this.class_start_date,
      "class_end_date": this.class_end_date,
      "messaging_between_learners": this.allow_msg_learner,
      "messaging_learner_to_coach": this.allow_msg_coach
    }
    console.log('params', params)
    this.service.post('create-course-api', params, 1).subscribe(result => {
      this.closeModal.nativeElement.click();
      this.closeModal2.nativeElement.click();
      this.closeModal3.nativeElement.click();
      this.clearAddFOrmValues();
      this.util.showSuccessAlert('Course Created Successfully');
      this.isLoadingBool = false;
      this.getAllCoursesList();
    })
  }

  // update Course api 
  updateCourses(): any {

    let params = {
      "courseid": this.courseList.nid,
      "coursename": this.editSampleForm.value.courseName,
      "banding": this.editSampleForm.value.banding,
      "level": this.editSampleForm.value.level,
      "course_category": this.editSampleForm.value.category,
      "sub_category": this.editSampleForm.value.field_sub_category,
      "sub_level": this.editSampleForm.value.field_sub_level,
      "sub_banding": this.editSampleForm.value.field_sub_banding,
    }

    console.log('saveCourses', params)

    this.isLoadingBool = true;
    this.service.post('update-course-api', params, 0).subscribe(result => {
      console.log("result", result);
      this.editclosebutton.nativeElement.click();
      if (result['Status'] == 1 || '1') {
        this.isLoadingBool = false;
        this.isSaveCourses = false;

        this.editForm = false;
        this.userIdDetails = '';
        this.selectedItems = [];
        this.checkboxes.forEach((element) => {
          element.nativeElement.checked = false;
        });
        this.deleteclosebutton.nativeElement.click();
        this.util.showSuccessAlert('Course Updated Successfully');
        this.getAllCoursesList();
      }
    })

  }

  clearAddFOrmValues() {
    this.courseName = '';
    this.selectedCategory = '';
    this.newCategory = '';
    this.level = '';
    this.newLevel = '';
    this.banding = '';
    this.newBanding = '';
  }

  getCourses() {
    // this.classes.getAllCoursesList();
  }

  // do logout setup
  logOut() {
    this.service.post('user-logout-api', '', 0).subscribe(result => {
      console.log('result', result)
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

  goToclasses() {
    this.router.navigate(['/classes'])
  }

}