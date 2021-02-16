import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { UtilService } from '../../providers/util.service';
import { SharedServiceService } from '../shared-service.service';
import * as $ from "jquery";


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
      this.selectedItems.push(courseList.nid)

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

  // create course 
  createCourse() {
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

  // delete class pop up for confirm details
  popDeleteClass() {
    let params = {
      "step": 1,
      "delete_class_nids": this.selectedItems
    }
    this.service.post('delete-class-api', params, 1).subscribe(result => {
      console.log('result', result);
      if (result['status'] == '1') {
        this.classesData = result.classesdata;
      }
    })
  }

  // final delete for classes
  proceedToDelete() {
    let params = {
      "step": 2,
      "delete_class_nids": this.selectedItems
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

  // cancel course details 
  cancelCourses() {
    this.viewClassesList();
    this.isSaveCourses = false;
    this.editForm = false;
    this.userIdDetails = '';
    this.selectedItems = []
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.showInputCategory = true;
  }



  saveClasses(index: number): any {
    console.log('index', index);
    let params = {
      "class_name": index['title'],
      "classid": index['nid'],
      // "class_code":index['field_class_code'],
      "startdate": index['field_start_date'],
      "enddate": index['field_end_date'],
      // "status":index['field_status']
    }
    console.log('params', params);
    this.isLoadingBool = true;
    this.service.post('update-class-api', params, 1).subscribe(result => {
      console.log("result", result);
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
        this.getAllCoursesList();
      }
    })
  }

}