import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service'
import { ActivatedRoute, Params } from '@angular/router';
import { UtilService } from '../../providers/util.service'

@Component({
  selector: 'app-choose-password',
  templateUrl: './choose-password.component.html',
  styleUrls: ['./choose-password.component.css']
})
export class ChoosePasswordComponent implements OnInit {
  ChangePasswordForm: FormGroup;
  passwordNotMatch: any = '';
  error_messages: any = '';
  userId: any = '';
  
  constructor(public formBuilder: FormBuilder, public util: UtilService, private activatedRoute: ActivatedRoute, public router: Router, public service: SharedServiceService) {
    this.setupFormData();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['uid'];
    });
  }

  setupFormData() {
    this.error_messages = {
      password: [
        { type: "required", message: '*Password is Required' },
        { type: "minlength", message: '*Please enter minimum 6 digit password' },
        { type: "pattern", message: '*Please enter strong password' }
      ],
      confirm_password: [
        { type: "required", message: '*Confirm Password is Required' },
        { type: "minlength", message: '*Please enter minimum 6 digit password' }
      ]

    };
    this.ChangePasswordForm = this.formBuilder.group(
      {
        password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')

          ])
        ),
        confirm_password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            this.equalto('password'),
            Validators.minLength(6)
          ])
        ),
      }
    );

  }

  // method for comparsion password and confirm password
  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {

      let input = control.value;

      let isValid = control.root.value[field_name] == input
      if (!isValid)
        return { 'equalTo': { isValid } }
      else
        return null;
    };
  }

  //getting value of password and confirm password
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get("password");
    const { value: confirmPassword } = formGroup.get("confirm_password");
    if (password === confirmPassword) {
      this.passwordNotMatch = ""
    } else {
      this.passwordNotMatch = "password not match"
    }
  }

  // Set password
  saveLogin() {
    let params = {
      "uid": this.userId,
      "password": this.ChangePasswordForm.value.password
    }

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
    this.service.setPassword(params, { headers: headers }).then((result) => {
      if (result['message'] == "Password Created Successfully And Logged in") {
        this.util.openSnackBarSuccess(result['message']);
        localStorage.setItem("uid", this.userId);
        localStorage.setItem("csrftoken", result['csrftoken']);
        this.router.navigate(['/school-name']);
      }
      else {
        this.util.openSnackBar(result['message']);
      }
    })
      .catch(error => {
        this.util.openSnackBar(error['message']);
      })
  }
}