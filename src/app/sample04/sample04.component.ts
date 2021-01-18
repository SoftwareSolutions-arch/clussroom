import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { UtilService } from '../../providers/util.service';


@Component({
  selector: 'app-sample04',
  templateUrl: './sample04.component.html',
  styleUrls: ['./sample04.component.css']
})
export class Sample04Component implements OnInit {
  allCourseList: any = [];
  isShow:boolean=false;
  constructor(public router: Router, public util: UtilService, public service: SharedServiceService, public formBuilder: FormBuilder) {
    this.getAllCoursesList();
  }

  ngOnInit(): void {
  }



  isCheckClicked(event) {
    console.log('event', event.target.checked);
  }

  // get all courses list
  getAllCoursesList() {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
    this.service.viewAllCourses({ headers: headers }).then((result) => {
      console.log('result', result['coursesdata'][50]);
      if (result['status'] == 1) {
        this.allCourseList = result['coursesdata'][50];

      }
      else {
        this.util.errorAlertPopup(result['mesaage']);
      }
    })
      .catch(error => {
        this.util.errorAlertPopup(error['message']);
      })
  }

  addNewCourse(event){
    this.isShow=true;
  }

  createCourse(){
    
  }
}