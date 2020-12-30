import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";

@Component({
  selector: 'app-school-name',
  templateUrl: './school-name.component.html',
  styleUrls: ['./school-name.component.css']
})
export class SchoolNameComponent implements OnInit {
  schoolNameForm: FormGroup;
  error_messages: any = '';
  constructor(public router: Router, public service: SharedServiceService, public formBuilder: FormBuilder) { 
    this.setupLoginFormData();
  }

  ngOnInit(): void {
  }

  setupLoginFormData() {
    this.error_messages = {
      schoolName: [
        { type: "required", message: '*School Name is Required' },
      ]
    };
    this.schoolNameForm = this.formBuilder.group(
      {
        schoolName: new FormControl(
          "",
          Validators.compose([
            Validators.required
          ])
        ),
      }
    );

  }


  next() {
    localStorage.setItem('schoolname',this.schoolNameForm.value.schoolName);
    this.router.navigate(['/instruction-name']);
  }

  back() {
    this.router.navigate(['/login']);
  }

  // get all invoice list
  postSchoolName() {
    let params = {
      "step": "3"
    }

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
    this.service.setSchool(params, { headers: headers }).then((result) => {
      console.log('vendor-first-login-api', result);
    })
      .catch(error => {
      })
  }
}
