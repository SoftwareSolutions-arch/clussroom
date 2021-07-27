import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';
import { UtilService } from '../../../providers/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-course-material',
  templateUrl: './student-course-material.component.html',
  styleUrls: ['./student-course-material.component.css']
})
export class StudentCourseMaterialComponent implements OnInit {
  isLoadingBool: boolean = false;
  userId: any = '';
  constructor(public service: SharedServiceService, private router: Router, public util: UtilService) {
    this.userId = localStorage.getItem("uid");
    
    this.viewClassMaterial();
  }

  ngOnInit(): void {
  }

  // get all values

  // view classes
  viewAllCoursesList() {
    let params = {
      "course_id": ''
    }
    this.isLoadingBool = false;
    this.service.post('view-all-classes-api', params, 1).subscribe(result => {
      
      this.isLoadingBool = false;
      if (result['status'] == 1) {
        // this.allClassesData = result['classesdata'];
      }
      else {
        this.util.errorAlertPopup(result['message']);
      }
    })
  }

  // student class material
  viewClassMaterial() {
    let params = {
      "user_id": this.userId
    }
    this.isLoadingBool = false;
    this.service.post('student-class-material', params, 1).subscribe(result => {
      
      this.isLoadingBool = false;
      if (result['status'] == 1) {
      }
      else {
        // this.util.errorAlertPopup(result['message']);
      }
    })
  }

}
