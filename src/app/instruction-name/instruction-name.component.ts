import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service'

@Component({
  selector: 'app-instruction-name',
  templateUrl: './instruction-name.component.html',
  styleUrls: ['./instruction-name.component.css']
})
export class InstructionNameComponent implements OnInit {
  termsCondition: boolean = false;
  SchoolName: any = '';
  instructionList: any = '';
  selectedItem: any = [];

  constructor(public router: Router, public service: SharedServiceService) {
    this.SchoolName = localStorage.getItem('schoolname');
    this.getInstruction();
  }

  ngOnInit(): void {
  }

  selectedItems(values) {

    this.selectedItem = values;
  }

  back() {
    this.router.navigate(['/school-name']);
  }

  agreeTerms(event) {
    this.termsCondition = event.target.checked
  }

  // Set password
  nextPage() {

    var uid = localStorage.getItem('uid');
    let data = {
      "schoolname": this.SchoolName,
      "instruction_name": this.selectedItem.tid,
      "uid": uid
    }

    this.service.post('vendor-first-login-api', data, 1).subscribe(result => {
      
      if (result.status == 1) {
        localStorage.setItem('instructionName', this.selectedItem.name);
        localStorage.setItem('isLogin', '1');
        localStorage.setItem('add_learner_permission', result.permission.add_learner);
        localStorage.setItem('class_creation_permission', result.permission.class_creation);
        localStorage.setItem('class_deletion_permission', result.permission.class_delation);
        localStorage.setItem('course_creation_permission', result.permission.course_creation);
        localStorage.setItem('course_library_upload_edit_permission', result.permission.course_library_upload_edit);
        localStorage.setItem('live_session_permission', result.permission.live_session);
        localStorage.setItem('main_library_upload_edit_permission', result.permission.main_library_upload_edit);
        this.router.navigate(['/sample04']);
      }
    })
  }

  // get all instruction api
  getInstruction() {
    this.service.post('instruction-name-list-api', '', 0).subscribe(result => {

      this.instructionList = result;
    })
  }
}
