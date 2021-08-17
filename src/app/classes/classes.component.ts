import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { UtilService } from '../../providers/util.service';
import { SharedServiceService } from '../shared-service.service';
import * as $ from "jquery";
import { ActivatedRoute, Router } from '@angular/router';


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

  selectedCategory: any = '';
  selectedItems = [];

  courseList = { class_start: '', class_end: '', class_name: '' };
  classesData: any = {};
  userIdDetails: any = '';
  showInputCategory: boolean = true;
  isClassEdited: boolean = true;
  selectedNewItems: any = '';
  instructionName: any = '';
  courseId: any = null;
  class_creation_permission: any = '';
  learnerId: any = null;
  showDisabledButton: boolean = false;
  constructor(public util: UtilService, private route: ActivatedRoute, private activatedRoute: ActivatedRoute, public router: Router, public service: SharedServiceService) {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.learnerId = this.route.snapshot.paramMap.get('learnerId');
    this.instructionName = localStorage.getItem('instructionName')
    this.class_creation_permission = localStorage.getItem('class_creation_permission');
    this.getClassesList();
    this.getAllCoursesList();
  }

  ngOnInit(): void {
  }

  selectCategory() {
    this.viewClassesList();
  }

  // handling page events
  handlePageChange(event): void {
    this.page = event;
  }

  isCourseCreated() {
    this.util.showSuccessToast("You don't have permission");
  }

  // get all courses list
  getAllCoursesList() {
    this.isLoadingBool = true;
    this.service.post('view-all-courses-api', '', 1).subscribe(result => {
      this.isLoadingBool = false;
      this.allCourseList = result['coursesdata'];
    })
  }



  getClassesList() {
    if (this.courseId != null) {
      let params = {
        "course_id": this.courseId
      }
      
      this.isLoadingBool = true;
      this.service.post('view-all-classes-api', params, 1).subscribe(result => {
        
        this.isLoadingBool = false;
        if (result['status'] == 1) {
          this.allClassesData = result['classesdata'];
          this.isTableShow = true;
        }
        else {
          this.util.errorAlertPopup(result['mesaage']);
        }
      })
    }
    if (this.learnerId != null) {
      this.isLoadingBool = true;
      let params = {
        "user_id": this.learnerId
      }
      
      this.service.post('student-classes-listing', params, 1).subscribe(result => {
        
        this.isLoadingBool = false;
        this.allClassesData = result.result
      })
    }
  }

  // view classes
  viewClassesList() {
    let params = {
      "course_id": this.selectedCategory
    }
    this.isLoadingBool = true;
    this.service.post('view-all-classes-api', params, 1).subscribe(result => {
      this.isLoadingBool = false;
      this.showDisabledButton = true;
      if (result['status'] == 1) {
        this.allClassesData = result['classesdata'];
        this.isTableShow = true;
      }
      else {
        this.util.errorAlertPopup(result['mesaage']);
      }
    })
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

      if (data['title'] == '') {
        this.util.errorAlertPopup('Class name can not be empty')
      }

      else {
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
            this.util.showSuccessAlert('Classes updated successfully');
            this.viewClassesList();
          }
        })
      }
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
    this.router.navigate(['/zoom-home']);
  }

  goToClasses(classList) {
    // this.router.navigate(['/test-listing'],{state:{data:classList.nid}})
    localStorage.setItem('classListId', classList.nid);
    this.router.navigate(['/test/test-listing-home']);
  }
}
