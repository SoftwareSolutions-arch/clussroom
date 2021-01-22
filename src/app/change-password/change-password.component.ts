import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service'
import { ActivatedRoute, Params } from '@angular/router';
import { UtilService } from '../../providers/util.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  ChangePasswordForm: FormGroup;
  passwordNotMatch: any = '';
  error_messages: any = '';
  otpId: any = '';
  constructor(public formBuilder: FormBuilder, public util: UtilService, public router: Router, public service: SharedServiceService) {
    this.setupFormData();
    this.otpId = localStorage.getItem('otpId');
  }

  ngOnInit(): void {
  }

  setupFormData() {
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
    this.router.navigate(['/login']);
  }

  // submit Otp 
  submitOtp() {
    let data = {
      "step": 3,
      "id": this.otpId,
      "password": this.ChangePasswordForm.value.password
    }

    this.service.post('forget-password-api', data, 0).subscribe(result => {
      console.log('result', result)
      if (result['message'] == "Password Reset Successfully ") {
        this.util.openSnackBarSuccess(result['message'])
        this.router.navigate(['/login']);
      }
      else {
        this.util.openSnackBar(result['message']);
      }
    })
  }


}
