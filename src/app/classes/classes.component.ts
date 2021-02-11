import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../providers/util.service';
import { SharedServiceService } from '../shared-service.service';
@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  isLoadingBool: boolean = true;
  allCourseList: any = [];
  allClassesData: any = [];

  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 10;

  selectedCategory: any;
  constructor(public util: UtilService, public service: SharedServiceService) {
    this.getAllCoursesList();
  }

  ngOnInit(): void {
  }

  // get all courses list
  getAllCoursesList() {
    this.isLoadingBool = true;
    this.service.post('view-all-courses-api', '', 1).subscribe(result => {
      this.isLoadingBool = false;
      if (result['status'] == 1) {
        this.allCourseList = result['coursesdata'];
      }
      else {
        this.util.errorAlertPopup(result['mesaage']);
      }
    })
  }

  selectCategory() {
    this.viewClassesList();
  }

  // view classes
  viewClassesList() {
    let params = {
      "course_id": this.selectedCategory
    }
    this.isLoadingBool = true;
    this.service.post('view-all-classes-api', params, 1).subscribe(result => {
      console.log('result++p', result)
      this.isLoadingBool = false;
      if (result['status'] == 1) {
        this.allClassesData = result['classesdata'];
      }
      else {
        this.util.errorAlertPopup(result['mesaage']);
      }
    })
  }

    // handling page events
    handlePageChange(event): void {
      this.page = event;
    }
}
