import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilService } from 'src/providers/util.service';
import { SharedServiceService } from '../shared-service.service';
import { NgForm, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-learners',
  templateUrl: './learners.component.html',
  styleUrls: ['./learners.component.css']
})
export class LearnersComponent implements OnInit {
  instructionName: any = '';
  isLoadingBool: boolean = true;
  allClassesList: any = [];
  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 10;
  addCourseForm: FormGroup;
  selectedCategory: any = '';
  allClassesData: any = [];
  allCourseList: any = '';
  allCategories: any = '';
  allLevel: any = '';
  allBanding: any = '';
  radioMail: any = 'byEmail';
  @ViewChild('closeModal') private closeModal: ElementRef;
  base64Files: any = Number;
  files: any[] = [];
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  selectedClass: any = '';

  constructor(public router: Router, public util: UtilService, public service: SharedServiceService, private fb: FormBuilder) {
    this.instructionName = localStorage.getItem('instructionName');
    this.getAllClassesList();
    this.getAllCoursesList();
    this.getallListingDropdown();
    this.addCourseForm = this.fb.group({
      employees: this.fb.array([]),
    })
    this.addInitialForms();
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

  ngOnInit(): void {
  }

  // handling page events
  handlePageChange(event): void {
    this.page = event;
  }

  // navigate to courses tab
  goToCourses() {
    this.router.navigate(['/sample04']);
  }

  goToclasses() {
    this.router.navigate(['/classes']);
  }

  goToClassList() {
    this.router.navigate(['/classes-list'])
  }

  // get all courses list
  getAllClassesList() {
    this.isLoadingBool = true;
    this.service.post('view-all-learners-api', '', 1).subscribe(result => {
      this.isLoadingBool = false;
      this.allClassesList = result;
    })
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
          this.viewAllCoursesList();
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
          this.viewAllCoursesList();
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
}