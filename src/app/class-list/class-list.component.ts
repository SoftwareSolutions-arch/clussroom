import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../../providers/util.service';
import { SharedServiceService } from '../shared-service.service';
import { ICountry, IState, ICity } from 'country-state-city'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm, FormBuilder, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})

export class ClassListComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;

  isLoadingBool: boolean = true;
  isTableShow: boolean = false;
  allClassesList: any = [];
  addCourseForm: FormGroup;
  allCourseList: any = '';
  selectedCategory: any = '';
  selectedCategorys: any = '';
  selectedClass: any = '';
  selectedClasses: any = '';
  allClassesData: any = [];
  allClassesDatas: any = [];

  allCategories: any = '';
  allLevel: any = '';
  allBanding: any = '';
  data: any = [];
  @ViewChild('closeModal') private closeModal: ElementRef;
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  @ViewChild('suspendModal') private suspendModal: ElementRef;
  @ViewChild('cancelClassModal') private cancelClassModal: ElementRef;
  @ViewChild('cancelModal') private cancelModal: ElementRef;

  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 10;

  radioMail: any = 'byEmail';
  base64Files: any = Number;
  selectedItems = [];
  isGoToShow: boolean = false;
  files: any[] = [];
  selectedCourseList: any = '';
  instructionName: any = '';

  constructor(public service: SharedServiceService, public router: Router, public util: UtilService, private fb: FormBuilder,
    private http: HttpClient) {

    // this.getAllClassesList();
    this.getAllCoursesList();
    this.addCourseForm = this.fb.group({
      employees: this.fb.array([]),
    })
    this.addInitialForms();
    this.getallListingDropdown();
    this.instructionName = localStorage.getItem('instructionName')

  }


  // handling page events
  handlePageChange(event): void {
    this.page = event;
  }

  employees(): FormArray {
    return this.addCourseForm.get("employees") as FormArray
  }

  newEmployee(): FormGroup {
    return this.fb.group({
      sub_title: this.fb.array([])
    })
  }

  addEmployee() {
    this.employees().push(this.newEmployee());
  }

  addInitialForms() {
    this.addEmployee();
    this.addEmployeeSkill(this.employees().controls.length - 1);
  }


  employeeSkills(empIndex: number): FormArray {
    return this.employees().at(empIndex).get("sub_title") as FormArray
  }

  newSkill(): FormGroup {
    return this.fb.group({
      sub_title: ['', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]]
    })
  }

  addEmployeeSkill(empIndex: number) {
    this.employeeSkills(empIndex).push(this.newSkill());
  }

  deleteUser(empIndex, skillIndex) {
    this.employeeSkills(empIndex).removeAt(skillIndex);
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

  ngOnInit(): void {
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

  // get all courses list
  getAllClassesList() {
    this.isLoadingBool = true;
    this.service.post('view-all-learners-api', '', 1).subscribe(result => {

      this.isLoadingBool = false;
      this.allClassesList = result;
    })
  }

  // view classes
  viewAllCoursesList() {
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

  // view classes
  viewAllCoursesLists() {
    let params = {
      "course_id": this.selectedCategorys.nid
    }
    this.isLoadingBool = true;
    this.service.post('view-all-classes-api', params, 1).subscribe(result => {
      this.isLoadingBool = false;
      if (result['status'] == 1) {
        this.allClassesDatas = result['classesdata'];
      }
      else {
        this.util.errorAlertPopup(result['message']);
      }
    })
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

  // view all learners
  getClassesListData() {
    let params = {
      "class_id": this.selectedClass.nid
    }
    this.isLoadingBool = true;
    this.service.post('view-all-learners-api', params, 1).subscribe(result => {
      console.log('result', result);
      this.allClassesList = result;
      this.isTableShow = true;
      this.isLoadingBool = false;
    })
  }

  // add learner
  addLearner() {
    if (this.radioMail == 'byEmail') {
      this.closeModal.nativeElement.click();
      let data = []
      this.addCourseForm.value.employees[0].sub_title.forEach(element => {
        data.push(element.sub_title)
      });
      let params = {
        "email": data,
        "class_id": this.selectedClass.nid
      }
      this.service.post('add-learner-api', params, 1).subscribe(result => {
        if (result['status'] == 1) {
          this.util.showSuccessAlert(result['error_message']);
          this.getClassesListData();
        }
        else {
          this.util.showSuccessAlert(result['error_message']);
        }
      })
    }
    else {
      let params = {
        "csv_file": this.base64Files,
        "class_id": this.selectedClass.nid
      }
      this.service.post('add-learner-api', params, 1).subscribe(result => {
        this.closeModal.nativeElement.click();
        if (result['status'] == 1) {
          this.util.showSuccessAlert(result['error_message']);
          this.getClassesListData();
        }
        else {
          this.util.showSuccessAlert(result['error_message']);
        }
      })
    }
  }

  // base 64 csv upload
  public changeListeners(files: FileList) {

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      this.base64Files = reader.result as Int32Array;

    }
  }

  isCheckClicked(event, courseList, i) {
    console.log('courseList', courseList);
    this.selectedCourseList = courseList;
    this.isGoToShow = true;
  }

  cancelCourses() {
    this.isGoToShow = false;
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
  }

  isModelOpen() {
    if (this.isGoToShow == false) {
      this.util.showSuccessToast('please select row');
    }
  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  public fileBrowseHandler(files: FileList) {
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      this.base64Files = reader.result as Int32Array;

    }
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {

      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  // Transfer to another course
  transferCourse() {
    console.log('this.selectedCategorys', this.selectedCategorys);
    console.log('this **', this.selectedCategory);
    let params = {
      "current_class": this.selectedCategory.nid,
      "class_transfer_to": this.selectedCategorys.nid,
      "get_all_user_id": this.selectedCourseList.learner_id
    }

    this.isLoadingBool = true;
    this.service.post('transfer-learner-to-another-course-api', params, 1).subscribe(result => {
      this.isLoadingBool = false;
    })
  }

  // Transfer to another course
  transferClass() {
    let params = {
      "current_class": this.selectedCategory.nid,
      "class_transfer_to": this.selectedClasses.nid,
      "get_all_user_id": this.selectedCourseList.learner_id
    }

    this.isLoadingBool = true;
    this.service.post('transfer-learner-to-another-course-api', params, 1).subscribe(result => {
      this.isLoadingBool = false;
    })
  }

  // Suspend learner step 1
  suspendLearner() {
    let params = {
      "step": 1,
      "userids": this.selectedCourseList.learner_id
    }

    this.isLoadingBool = true;
    this.service.post('suspend-learner-api', params, 1).subscribe(result => {
      this.isLoadingBool = false;
    })
  }

  // Suspend learner step 2
  confirmSuspendLearner() {
    this.cancelModal.nativeElement.click();
    let params = {
      "step": 2,
      "userids": [this.selectedCourseList.learner_id]
    }
    this.isLoadingBool = true;
    this.service.post('suspend-learner-api', params, 1).subscribe(result => {
      this.suspendModal.nativeElement.click();
      if (result.status == 1) {
        this.isLoadingBool = false;
        this.getClassesListData();
        this.util.showSuccessAlert(result.error_message);
      }
    })
  }

  // cancel invite step 1
  cancelInvite() {
    let params = {
      "step": 1,
      "userids": [this.selectedCourseList.learner_id]
    }

    this.isLoadingBool = true;
    this.service.post('cancel-invite-learner-api', params, 1).subscribe(result => {

      if (result.status == 1) {
        this.isLoadingBool = false;
        // this.getClassesListData();
        // this.util.showSuccessAlert(result.error_message);
      }
    })
  }

  // cancel invite step 2
  cancelInviteConfirm() {
    this.cancelModal.nativeElement.click();
    let params = {
      "step": 2,
      "userids": [this.selectedCourseList.learner_id]
    }

    this.isLoadingBool = true;
    this.service.post('cancel-invite-learner-api', params, 1).subscribe(result => {
      this.cancelClassModal.nativeElement.click();

      if (result.status == 1) {
        this.isLoadingBool = false;
        this.getClassesListData();
        this.util.showSuccessAlert(result.error_message);
      }
    })
  }

  goToStorage() {
    this.router.navigate(['/storage']);
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }

  goToCourses() {
    this.router.navigate(['/sample04']);
  }

  goToclasses() {
    this.router.navigate(['/classes']);
  }

  goToLiveSession() {
    this.router.navigate(['/live-session']);
  }

  goToLearner() {
    this.router.navigate(['/learners']);
  }
}