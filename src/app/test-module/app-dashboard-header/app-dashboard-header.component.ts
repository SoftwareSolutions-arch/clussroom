import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';
@Component({
  selector: 'app-app-dashboard-header',
  templateUrl: './app-dashboard-header.component.html',
  styleUrls: ['./app-dashboard-header.component.css']
})
export class AppDashboardHeaderComponent implements OnInit {
  headerData: any = '';
  isLoadingBool: boolean = true;
  classId: any = '';
  constructor(public service: SharedServiceService, public util: UtilService, private router: Router) {
    this.classId = localStorage.getItem('classListId');
    this.getDashboardHeaderData();
  }

  ngOnInit(): void {
  }

  getDashboardHeaderData() {
    let params = {
      "class_id": this.classId
    }
    this.service.post('class-material-dashboard-api', params, 1).subscribe(result => {

      this.headerData = result
      this.isLoadingBool = false;
    })
  }

  goTotest() {
    this.router.navigate(['/test/test-listing-home']);
  }

  goToAssignment() {
    this.router.navigate(['/assignment/test-assignment-home']);
  }

  goToClassMaterial() {
    this.router.navigate(['/class-material/assignment-detail']);
  }

}
