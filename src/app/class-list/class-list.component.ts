import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../../providers/util.service';
import { SharedServiceService } from '../shared-service.service';
import { ICountry, IState, ICity } from 'country-state-city'

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})

export class ClassListComponent implements OnInit {
  isLoadingBool: boolean = true;
  allClassesList: any = [];

  constructor(public service: SharedServiceService, public router: Router, public util: UtilService) {
    this.getAllClassesList();
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

  goToClassList() { }
}