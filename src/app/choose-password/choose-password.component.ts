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
  passwordIsValid = false;

  constructor(public formBuilder: FormBuilder, public util: UtilService, private activatedRoute: ActivatedRoute, public router: Router, public service: SharedServiceService) {
    this.setupFormData();
    this.checkPassword();
    var data = localStorage.getItem('isPasswordSet')
    if (data == '1') {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['uid'];
    });
  }

  setupFormData() {
    this.error_messages = {
      password: [
        { type: "required", message: '*Password is required' },
        { type: "pattern", message: '*Please enter atleast' },
        { type: "pattern", message: '*One lowercase alphabet' },
        { type: "pattern", message: '*One uppercase alphabet' },
        { type: "pattern", message: '*One number' },
        { type: "pattern", message: '*One special character' }
      ],
      confirm_password: [
        { type: "required", message: '*Confirm password is required' }
      ]

    };
    this.ChangePasswordForm = this.formBuilder.group(
      {
        password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')

          ])
        ),
        confirm_password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            this.equalto('password'),
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

  passwordValid(event) {
    this.passwordIsValid = event;
  }

  // save password and log in
  saveLogin() {
    var data1 = this.ChangePasswordForm.value.password;
    var data2 = this.ChangePasswordForm.value.confirm_password;
    if (data1 != data2) {
      this.util.errorAlertPopup('Please choose both password similar');
      return
    }

    let data = {
      "step": 2,
      "uid": this.userId,
      "password": this.ChangePasswordForm.value.password
    }

    this.service.post('create-password-api', data, 0).subscribe(result => {
      console.log('res',result);
      if (result['status'] == 1 || '1') {
        this.util.openSnackBarSuccess(result['message']);
        localStorage.setItem("isPasswordSet", '1');
        localStorage.setItem("uid", this.userId);
        localStorage.setItem("csrftoken", result['csrftoken']);
        localStorage.setItem('Authorization', result['basic_auth_token'])
        if(result.role=='learner'){
          this.router.navigate(['/student/student-course']);
        }

        else {
          this.router.navigate(['/school-name']);
        }
      }
      else {
        this.util.errorAlertPopup(result['message']);
      }
    })
  }

  checkPassword() {
    let data = {
      "step": 1,
      "uid": this.userId
    }
    this.service.post('create-password-api', data, 0).subscribe(result => {
      if (result['status'] == 1 || '1') {
      }
      else {
        this.util.errorAlertPopup(result['message']);
      }
    })
  }
}
