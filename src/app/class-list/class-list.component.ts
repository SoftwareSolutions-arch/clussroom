import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../../providers/util.service';
import { SharedServiceService } from '../shared-service.service';
import { ICountry, IState, ICity } from 'country-state-city'
import { FormGroup } from '@angular/forms';
import { NgForm, FormBuilder, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})

export class ClassListComponent implements OnInit {
  isLoadingBool: boolean = true;
  allClassesList: any = [];
  loginForm: FormGroup;
  allCourseList: any = '';
  selectedCategory: any = '';
  selectedClass: any = '';
  allClassesData: any = [];
  constructor(public service: SharedServiceService, public router: Router, public util: UtilService, private fb: FormBuilder,
    private http: HttpClient) {
    this.getAllClassesList();
    this.inItForm();
    this.getAllCoursesList();
  }

  inItForm() {
    this.loginForm = this.fb.group({
      users: this.fb.array([this.userFormGroup()])
    });
  }

  userFormGroup() {
    return this.fb.group({
      username: ''
    });
  }

  get UsersArray() {
    return this.loginForm.get('users') as FormArray;
  }

  addUser() {
    this.UsersArray.push(this.userFormGroup());
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

  deleteUser() {
    const index = this.UsersArray.length;
    this.UsersArray.removeAt(index - 1);
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
      console.log('result++', result);
      this.isLoadingBool = false;
      this.allClassesList = result;
    })
  }

  goToLearners() {
    this.router.navigate(['/learners']);
  }

  // view classes
  viewAllCoursesList() {
    console.log('this.selectedCategory', this.selectedCategory)
    let params = {
      "course_id": this.selectedCategory.nid
    }
    this.isLoadingBool = true;
    this.service.post('view-all-classes-api', params, 1).subscribe(result => {
      console.log('result', result)
      this.isLoadingBool = false;
      if (result['status'] == 1) {
        this.allClassesData = result['classesdata'];
        // this.isTableShow = true;
      }
      else {
        this.util.errorAlertPopup(result['mesaage']);
      }
    })
  }

  viewClassesList() {
    console.log('selectedClass', this.selectedClass);
  }
}