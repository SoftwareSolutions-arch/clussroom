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
  selectedClass: any = '';
  allClassesData: any = [];

  allCategories: any = '';
  allLevel: any = '';
  allBanding: any = '';
  data: any = [];
  @ViewChild('closeModal') private closeModal: ElementRef;
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;

  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 10;

  radioMail: any = 'byEmail';
  // files: any = File;
  base64Files: any = Number;
  selectedItems = [];
  isGoToShow: boolean = false;
  files: any[] = [];

  constructor(public service: SharedServiceService, public router: Router, public util: UtilService, private fb: FormBuilder,
    private http: HttpClient) {

    this.getAllClassesList();
    this.getAllCoursesList();
    this.addCourseForm = this.fb.group({
      employees: this.fb.array([]),

    })
    this.addInitialForms();
    this.getallListingDropdown();
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

  // navigate to courses tab
  goToCourses() {
    this.router.navigate(['/sample04']);
  }

  goToclasses() {
    this.router.navigate(['/classes']);
  }

  // get all courses list
  getAllClassesList() {
    this.isLoadingBool = true;
    this.service.post('view-all-learners-api', '', 1).subscribe(result => {
      this.isLoadingBool = false;
      this.allClassesList = result;
    })
  }

  goToLearners() {
    this.router.navigate(['/learners']);
  }

  // view classes
  viewAllCoursesList() {
    let params = {
      "course_id": this.selectedCategory.nid
    }
    this.isLoadingBool = true;
    this.service.post('view-all-classes-api', params, 1).subscribe(result => {
      console.log('result++;p', result);
      this.isLoadingBool = false;
      if (result['status'] == 1) {
        this.allClassesData = result['classesdata'];
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

  isClickedRadio() {
    console.log('radioMail', this.radioMail);
  }

  // public changeListener(files: FileList){
  //   var reader = new FileReader();
  //   reader.readAsDataURL(files[0]);
  //   this.files=reader.result
  //   reader.onload = function () {
  //     let csv: string = reader.result as string;
  //     console.log('reader.result',csv);
  //   };

  //   if(files && files.length > 0) {
  //      let file : File = files.item(0);
  //        let reader: FileReader = new FileReader();
  //        reader.readAsText(file);
  //        reader.onload = (e) => {
  //          console.log('e data',e.target.result);
  //           let csv: string = reader.result as string;
  //           // console.log(csv);`
  //        }
  //     }
  // }

  // base 64 csv upload
  public changeListeners(files: FileList) {
    console.log('tfile', files)
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      this.base64Files = reader.result as Int32Array;
      console.log('this.base64Files', this.base64Files);
    }
  }

  isCheckClicked(event, courseList, i) {
    this.isGoToShow = true;
  }

  cancelCourses() {
    this.isGoToShow = false;
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
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
      console.log('this.base64Files', this.base64Files);
    }
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
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

}