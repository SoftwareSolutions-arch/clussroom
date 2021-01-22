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
  isShow: boolean = false;

  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 5;

  constructor(public router: Router, public util: UtilService, public service: SharedServiceService, public formBuilder: FormBuilder) {
    this.getAllCoursesList();
  }

  handlePageChange(event): void {
    this.page = event;
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }


  ngOnInit(): void {
  }

  isCheckClicked(event) {
  }

  addNewCourse(courseList) {
    console.log('courseList', courseList);
    this.isShow = true;
  }

  viewMore(courseList) {
    console.log('courseList', courseList)
  }

  getSort() {
    // this.allCourseList.sort();


    this.allCourseList.sort((a, b) => a.field_level.localeCompare(b.field_level));

    console.log(this.allCourseList)
  }

  public doFilter = (value: string) => {
    this.allCourseList.filter = value.trim().toLocaleLowerCase();
    console.log('this.allCourseList.filter', this.allCourseList.filter)
    var searchText = value.trim().toLocaleLowerCase();

    return this.allCourseList.filter(it => {
      return it.toLocaleLowerCase().includes(searchText);
    });
  }

  // get all courses list
  getAllCoursesList() {
    this.service.post('view-all-courses-api','', 0).subscribe(result => {
      console.log('result',result)
      if (result['status'] == 1) {
        const { tutorials, totalItems } = result['coursesdata'];
        this.allCourseList = result['coursesdata'];
        this.tutorials = tutorials;
        this.count = totalItems;
      }
      else {
        this.util.errorAlertPopup(result['mesaage']);
      }

    })
  }
}