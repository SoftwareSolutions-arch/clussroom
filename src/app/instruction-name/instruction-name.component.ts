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
    console.log(values)
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
    console.log('this.selectedItem.name', this.selectedItem.name)
    var uid = localStorage.getItem('uid');
    let data = {
      "schoolname": this.SchoolName,
      "instruction_name": this.selectedItem.tid,
      "uid": uid
    }

    this.service.post('vendor-first-login-api', data, 1).subscribe(result => {
      console.log('result', result)
      if (result.status == 1) {
        localStorage.setItem('instructionName', this.selectedItem.name);
        localStorage.setItem('isLogin', '1');
        this.router.navigate(['/sample04']);
      }
    })
  }

  // get all instruction api
  getInstruction() {
    this.service.post('instruction-name-list-api', '', 0).subscribe(result => {
      console.log('res', result);
      this.instructionList = result;
    })
  }
}
