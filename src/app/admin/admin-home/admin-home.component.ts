import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../../shared-service.service';
import { UtilService } from '../../../providers/util.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  isLoadingBool: boolean = true;
  classId: any = '';
  adminList: any;
  adminDetails: any = {
    email: '',
    admintype: ''
  }
  isMasterSel: boolean;
  categoryList: any;
  checkedCategoryList: any;
  userId: any = '';
  allCourseList: any = '';
  arrayItem = []
  permissionRights = [];
  add_learner: any;
  main_library: any;
  course_library: any;
  live_session: any;
  courseList: any;
  selectedItems: any = '';
  selectededitItems = [];
  class_creation: any = '';
  class_deletion: any = '';
  course_creation: any = '';
  allCHeckboxValue: any = {}
  @ViewChild('removeadmin') private removeadmin: ElementRef;
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  @ViewChild('closeEdit') private closeEdit: ElementRef;

  currentIndex = -1;

  page = 1;
  count = 0;
  pageSize = 10;
  
  constructor(public service: SharedServiceService, public util: UtilService, private router: Router, private toastr: ToastrService) {
    this.userId = localStorage.getItem("uid");
    this.allAdminList();
    this.getAllCoursesList();
  }

  ngOnInit(): void {
  }

  // get test listing data
  allAdminList() {
    this.isLoadingBool = true;
    let params = {
      "vendor_id": this.userId
    }
    console.log('pareams', params)
    this.service.post('vendor-admin-listing-api', params, 1).subscribe(result => {
      console.log('res', result);
      this.adminList = result;
      this.isLoadingBool = false;
    })
  }

  // get all courses list
  getAllCoursesList() {
    this.isLoadingBool = true;
    this.service.post('view-all-courses-api', '', 1).subscribe(result => {
      this.isLoadingBool = false;
      this.allCourseList = result['coursesdata'];
    })
  }

  // step first add admin
  addAdminStep1() {
  }

  isCheckboxClicked(event, item) {
    console.log('item', item)
    this.selectedItems = '';
    if (event.target.checked == true) {
      this.arrayItem.push(item);
    }

    if (event.target.checked == false) {
      this.arrayItem = this.arrayItem.filter(
        book => book.nid != item.nid);
      if (this.arrayItem.length == 0) {
      }
    }
  }

  permissionList(data) {
    this.permissionRights.push(data);
  }

  addRemovePermission(event) {
    this.add_learner = event.target.checked;
  }
  mainLibraryPermission(event) {
    this.main_library = event.target.checked;
  }
  courseLibraryPermission(event) {
    this.course_library = event.target.checked;
  }
  liveSession(event) {
    this.live_session = event.target.checked;
  }
  classCreation(event) {
    this.class_creation = event.target.checked;
  }
  classDeletion(event) {
    this.class_deletion = event.target.checked;
  }
  courseCreation(event) {
    this.course_creation = event.target.checked;
  }

  // confirm step 1
  confirm() {
    var data = [];
    this.arrayItem.forEach(element => {
      console.log('res', element);
      data.push(element.nid);
    });
    let params = {
      "vendor_id": this.userId,
      "email": this.adminDetails.email,
      "admin_type": this.adminDetails.admintype,
      "course_id": data,
      "add_learner": (this.add_learner == true) ? "1" : "0",
      "main_library": (this.main_library == true) ? "1" : "0",
      "course_library": (this.course_library == true) ? "1" : "0",
      "live_session": (this.live_session == true) ? "1" : "0",
      "course_creation": (this.course_creation == true) ? "1" : "0",
      "class_creation": (this.class_creation == true) ? "1" : "0",
      "class_delation": (this.class_deletion == true) ? "1" : "0"

    }
    console.log('params', params);
    this.isLoadingBool = true;
    this.service.post('Add-vendor-admin-api', params, 1).subscribe(result => {
      console.log('result', result);
      this.allAdminList();
      this.isLoadingBool = false;
    })
  }

    // handling page events
    handlePageChange(event): void {
      this.page = event;
    }

  // checkbox value
  checkBox(event, item) {
    this.selectedItems = item;
    // if (event.target.checked == true) {
    //   this.selectedItems.push(item);
    // }
    // if (event.target.checked == false) {
    //   this.selectedItems = this.selectedItems.filter(
    //     book => book.id != item.id);
    //   if (this.selectedItems.length == 0) {
    //   }
    // }
    console.log('this.selectedItems', this.selectedItems);
  }

  editCheckBox(event, item) {
    if (event.target.checked == true) {
      this.selectededitItems.push(item);
    }
    if (event.target.checked == false) {
      this.selectededitItems = this.selectededitItems.filter(
        book => book.nid != item.nid);
    }
  }



  // remove vendor admin 
  removeVendorAdmin() {
    this.isLoadingBool = true;
    let params = {
      "id": this.selectedItems.id,
      "p_id": this.selectedItems.permissions_data[0].p_id,
    }
    console.log('params', params)
    this.service.post('Remove-vendor-admin-api', params, 1).subscribe(result => {
      console.log('res', result);
      this.removeadmin.nativeElement.click();
      this.allAdminList();
      this.isLoadingBool = false;
    })
  }

  noRowSelected() {
    this.toastr.error("please select row");
  }

  confirmEdit() {
    var array = [];
    this.selectededitItems.forEach(element => {
      array.push(element.nid)
    });
    let params = {
      "add_learner": (this.allCHeckboxValue.add_learners == true) ? "1" : "0",
      "main_library": (this.allCHeckboxValue.main_library == true) ? "1" : "0",
      "course_library": (this.allCHeckboxValue.course_library == true) ? "1" : "0",
      "live_session": (this.allCHeckboxValue.live_sessions == true) ? "1" : "0",
      "course_creation": (this.allCHeckboxValue.course_creation == true) ? "1" : "0",
      "class_creation": (this.allCHeckboxValue.class_creation == true) ? "1" : "0",
      "class_delation": (this.allCHeckboxValue.class_delation == true) ? "1" : "0",
      'course_id': array,
      "email": this.selectedItems.email,
      'id': this.userId,
      'p_id': this.selectedItems.permissions_data[0].p_id
    }

    console.log('params', params);
    this.isLoadingBool = true;
    this.service.post('edit-vendor-admin-api', params, 1).subscribe(result => {
      console.log('result', result);
      this.util.showSuccessToast('Updated successfully')
      this.closeEdit.nativeElement.click();
      this.allAdminList();
      this.isLoadingBool = false;
    })
  }

  goToPermissionRight() {
    this.router.navigate(['admin-sub/permission-rights']);
  }
}