import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilService } from '../../providers/util.service';
import { SharedServiceService } from '../shared-service.service';
import {Sample04Component} from '../sample04/sample04.component'
@Component({
  selector: 'app-dashboardheader',
  templateUrl: './dashboardheader.component.html',
  styleUrls: ['./dashboardheader.component.css']
})
export class DashboardheaderComponent implements OnInit {
  isLoadingBool: boolean = false;
  constructor(public router: Router, public util: UtilService, public service: SharedServiceService,
    public formBuilder: FormBuilder,public sampleOject:Sample04Component) {}

  ngOnInit(): void {
  }


  public doFilter = (value: string) => {
    
    // this.allCourseList.filter = value.trim().toLocaleLowerCase();
    // 
    // var searchText = value.trim().toLocaleLowerCase();

    // return this.allCourseList.filter(it => {
    //   return it.toLocaleLowerCase().includes(searchText);
    // });
  }

    // search api
    serchCoursesList(value) {
      
      let params={
        "type":"course",
        "course_name":value.trim().toLocaleLowerCase(),
      }
      this.isLoadingBool = true;
      this.service.post('search-api', params, 1).subscribe(result => {
        this.isLoadingBool = false;
        
        if (result['status'] == 1) {
          // const { tutorials, totalItems } = result['coursesdata'];
          this.sampleOject.allCourseList = result['coursesdata'];
          // this.sampleOject.tutorials = tutorials;
          // this.sampleOject.count = totalItems;
        }
        else {
          this.util.errorAlertPopup(result['mesaage']);
        }
  
      })
    }

}
