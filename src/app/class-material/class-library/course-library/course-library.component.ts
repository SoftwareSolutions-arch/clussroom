import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../../providers/util.service';
import { SharedServiceService } from '../../../shared-service.service';
@Component({
  selector: 'app-course-library',
  templateUrl: './course-library.component.html',
  styleUrls: ['./course-library.component.css']
})
export class CourseLibraryComponent implements OnInit {
  isLoadingBool: any = '';
  constructor(public util: UtilService, public service: SharedServiceService) {
    this.getAssignmentData();
  }

  ngOnInit() {
  }

  deleteCourse() { }

  // get assignment data
  getAssignmentData() {
    this.isLoadingBool = true;
    let params = {
      "user_id": "56",
      "type": "personal"
    }
    this.service.post('vendor_library_listing', params, 1).subscribe(result => {
      
      this.isLoadingBool = false;
      if (result['status'] == 1) {
      }
      else {
        // this.util.errorAlertPopup(result['mesaage']);
      }
    })
  }
}