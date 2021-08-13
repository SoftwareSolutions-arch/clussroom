import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';

@Component({
  selector: 'app-grading-header',
  templateUrl: './grading-header.component.html',
  styleUrls: ['./grading-header.component.css']
})
export class GradingHeaderComponent implements OnInit {
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

  goTotest(){
    this.router.navigate(['/test/test-listing-home']);
  }

}
