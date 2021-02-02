import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboardheader',
  templateUrl: './dashboardheader.component.html',
  styleUrls: ['./dashboardheader.component.css']
})
export class DashboardheaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  public doFilter = (value: string) => {
    console.log('value',value);
    // this.allCourseList.filter = value.trim().toLocaleLowerCase();
    // console.log('this.allCourseList.filter', this.allCourseList.filter)
    // var searchText = value.trim().toLocaleLowerCase();

    // return this.allCourseList.filter(it => {
    //   return it.toLocaleLowerCase().includes(searchText);
    // });
  }

}
