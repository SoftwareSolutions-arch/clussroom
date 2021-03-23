import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 10;

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
      console.log('result', result)
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

  getClassesListData() {
    let params = {
      "class_id": this.selectedClass.nid
    }
    console.log('params+++P', params);
    this.isLoadingBool = true;
    this.service.post('view-all-learners-api', params, 1).subscribe(result => {
      console.log('result',result);
      this.isTableShow = true;
      this.isLoadingBool = false;
      if (result['status'] == 1) {
      }
      else {
      }
    })
  }

  confirmBtn() {
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
      console.log('result', result['error_message']);
      if (result['status'] == 1) {
        this.util.showSuccessAlert(result['error_message'])
      }
      else {
        this.util.showSuccessAlert(result['error_message']);
      }
    })
  }
}