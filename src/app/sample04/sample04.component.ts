import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import { UtilService } from '../../providers/util.service';
import { ClassesComponent } from '../classes/classes.component';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-sample04',
  templateUrl: './sample04.component.html',
  styleUrls: ['./sample04.component.css'],

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
  courseName: any = '';
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
  allTrue: boolean = false;

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
  demoUser = { date: '', dates: '' };
  isClickedRadio: any = '';
  isClickedRadios: any = '';
  class_start_date_edit: any = '';
  selectedNewItems: any = '';
  edit_allow_msg_learner: any = '';
  edit_allow_msg_coach: any = '';
  instructionName: any = '';
  constructor(public router: Router, public util: UtilService, public service: SharedServiceService,
    public formBuilder: FormBuilder, public classes: ClassesComponent) {
    this.getAllCoursesList();
    this.getallListingDropdown();
    this.setupLoginFormData();
    this.instructionName = localStorage.getItem('instructionName')
  }

  parseDate(dateString: string): Date {
    var dateStrings = JSON.parse(dateString)
    if (dateStrings) {
      return new Date(dateStrings);
    }
    return null;
  }

  ngOnInit(): void {

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
        edit_class_from: new FormControl("", Validators.compose([Validators.required])),
        edit_class_to: new FormControl("", Validators.compose([Validators.required])),
        datagram: new FormControl("", Validators.compose([Validators.required])),
        datagram2: new FormControl("", Validators.compose([Validators.required])),
        edit_allow_message_learner: new FormControl("", Validators.compose([Validators.required])),
        edit_allow_message_coach: new FormControl("", Validators.compose([Validators.required])),
        newCategory: new FormControl("", Validators.compose([Validators.required])),
        newLevel: new FormControl("", Validators.compose([Validators.required])),
        newBanding: new FormControl("", Validators.compose([Validators.required]))
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

    if (event.target.checked == true) {
      this.courseList = courseList;
      this.editSampleForm.controls.courseName.setValue(courseList.title);
      this.editSampleForm.controls.category.setValue(courseList.field_category_id);
      this.editSampleForm.controls.level.setValue(courseList.field_level_id)
      this.editSampleForm.controls.banding.setValue(courseList.field_banding_id)
      this.editSampleForm.controls.datagram.setValue(courseList.field_access_material_from)
      this.editSampleForm.controls.datagram2.setValue(courseList.field_access_material_to)

      this.demoUser.date = courseList.field_access_material_from;
      this.demoUser.dates = courseList.field_access_material_to;

      this.editForm = true;
      // this.selectedItems.push({ 'nid': courseList.nid })
      this.selectedItems.push(courseList.nid);
      this.selectedNewItems = courseList.nid

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
      return
    }
    else {
      this.newCategory = '';
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
      this.newLevel = '';
      var items = this.allLevel.filter(
        book => book.tid == this.level);
      this.patchLevelName = items[0].name
    }
  }

  // get banding details in drop down menu
  getBanding() {
    if (this.banding == 'create_new') {
      this.isBandingAdded = true;
    }
    else {
      this.isBandingAdded = false;
      this.newBanding = '';
      var items = this.allBanding.filter(
        book => book.tid == this.banding);
      this.patchBandingName = items[0].name
    }
  }

  // get categories details in drop down menu
  getEditCategory() {

    if (this.editSampleForm.value.category == 'create_new') {
      this.isCourseAdded = true;
    }
    else {
      this.newCategory = '';
      this.isCourseAdded = false;
      // var items = this.allCategories.filter(
      //   book => book.tid == this.selectedCategory);
      // this.patchCategorieName = items[0].name
    }
  }

  // get level details in drop down menu
  getEditLevel() {
    if (this.editSampleForm.value.level == 'create_new') {
      this.isLevelAdded = true;
    }
    else {
      this.newLevel = ''
      this.isLevelAdded = false;
      // var items = this.allLevel.filter(
      //   book => book.tid == this.level);
      // this.patchLevelName = items[0].name
    }
  }

  // get banding details in drop down menu
  getEditBanding() {
    if (this.editSampleForm.value.banding == 'create_new') {
      this.isBandingAdded = true;
    }
    else {
      this.newBanding = '';
      this.isBandingAdded = false;
      // var items = this.allBanding.filter(
      //   book => book.tid == this.banding);
      // this.patchBandingName = items[0].name
    }
  }

  // delete single or multiple course
  deleteCourse() {
    let params = {
      "delete_course_nids": [this.selectedNewItems]
    }
    this.isLoadingBool = true;
    this.service.post('delete-course-api', params, 1).subscribe(result => {
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
      "access_material_from": this.class_start_date,
      "access_material_to": this.class_end_date,
      "messaging_between_learners": this.allow_msg_learner,
      "messaging_learner_to_coach": this.allow_msg_coach
    }
    this.service.post('create-course-api', params, 1).subscribe(result => {
      this.checkboxes.forEach((element) => {
        element.nativeElement.checked = false;
      });
      this.closeModal.nativeElement.click();
      this.closeModal2.nativeElement.click();
      this.closeModal3.nativeElement.click();
      this.clearAddFOrmValues();
      this.util.showSuccessAlert('Course Created Successfully');
      this.isLoadingBool = false;
      this.getAllCoursesList();
    })
  }

  nextPopup() {
    var x = new Date(this.class_start_date);
    var y = new Date(this.class_end_date);

    if (x > y) {
      this.util.errorAlertPopup('start date should be less than end date');
      this.allTrue = false;

    }
    else {
      this.allTrue = true;
    }
  }

  // update Course api 
  updateCourses(courseList): any {
    var x = new Date(this.editSampleForm.value.datagram);
    var y = new Date(this.editSampleForm.value.datagram2);


    if (x > y) {
      this.util.errorAlertPopup('start date should be less than end date');
    }

    else {
      let params = {
        "courseid": this.courseList.nid,
        "coursename": this.editSampleForm.value.courseName,
        "banding": this.editSampleForm.value.banding,
        "level": this.editSampleForm.value.level,
        "course_category": this.editSampleForm.value.category,
        // "sub_category": this.editSampleForm.value.field_sub_category,
        // "sub_level": this.editSampleForm.value.field_sub_level,
        // "sub_banding": this.editSampleForm.value.field_sub_banding,
        "messaging_between_learners": courseList.field_messaging_between_learners,
        "messaging_learner_to_coach": courseList.field_messaging_learner_to_coach,
        "access_material_from": (this.editSampleForm.value.datagram) === '' || undefined ? this.demoUser.date : this.editSampleForm.value.datagram,
        "access_material_to": (this.editSampleForm.value.datagram2) === '' || undefined ? this.demoUser.dates : this.editSampleForm.value.datagram2,
        "new_banding": this.editSampleForm.value.newBanding,
        "new_category": this.editSampleForm.value.newCategory,
        "new_level": this.editSampleForm.value.newLevel,
      }




      this.isLoadingBool = true;
      this.service.post('update-course-api', params, 0).subscribe(result => {

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
          this.util.showSuccessAlert('Course Update Successfully');
          // this.clearAddFOrmValues();
          this.isCourseAdded = false;
          this.isLevelAdded = false;
          this.isBandingAdded = false;
          this.getallListingDropdown();
          this.getAllCoursesList();
        }
      })
    }
  }

  clearAddFOrmValues() {
    this.courseName = '';
    this.selectedCategory = '';
    this.newCategory = '';
    this.level = '';
    this.newLevel = '';
    this.banding = '';
    this.newBanding = '';
    this.class_start_date = '';
    this.isClickedRadios = '';
    this.isClickedRadio = '';
    this.class_end_date = '';
    this.allow_msg_learner = '';
    this.allow_msg_coach = '';
    this.patchCategorieName = '';
    this.patchLevelName = '';
    this.patchBandingName = '';
    this.demoUser.date = '';
    this.demoUser.dates = '';
    this.editSampleForm.reset();
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

  goToclasses() {
    this.router.navigate(['/classes']);
  }

  getRadio(event) {
    this.isClickedRadio = event.target.value;
  }

  getRadios(event) {
    this.isClickedRadios = event.target.value;
  }

  goToClassList() {
    this.router.navigate(['/classes-list'])
  }

  goToLearner() {
    this.router.navigate(['/learners']);
  }

  goToStroage() {
    this.router.navigate(['/storage']);
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }

  // go to live sessions
  goToLiveSession() {
    this.router.navigate(['/live-session']);
  }

}