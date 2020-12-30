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
  userId: any = ''
  constructor(public formBuilder: FormBuilder, public util: UtilService, private activatedRoute: ActivatedRoute, public router: Router, public service: SharedServiceService) {
    this.setupLoginFormData();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params)
      this.userId = params['uid'];
      console.log('uid', this.userId);
    });
  }

  setupLoginFormData() {
    this.error_messages = {
      password: [
        { type: "required", message: '*Password is Required' },
        { type: "minlength", message: '*Please enter minimum 6 digit password' }
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
      "uid": '585',
      "password": this.ChangePasswordForm.value.password
    }

    console.log('params', params);

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
    this.service.setPassword(params, { headers: headers }).then((result) => {
      console.log('result', result);
      if (result['message'] == "Uid Empty") {

        this.util.openSnackBar(result['message']);
      }

      else {
        this.util.openSnackBar(result['message']);
        localStorage.setItem("uid", this.userId);
        localStorage.setItem("passwordSet", 'true');
        this.router.navigate(['/school-name']);
      }
    })
      .catch(error => {
        console.log(error, 'error')
        this.util.openSnackBar(error['message']);
      })
  }

}