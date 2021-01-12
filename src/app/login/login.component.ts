import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { UtilService } from '../../providers/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  error_messages: any = '';
  isTextFieldType: boolean;
  hideImage: boolean = true;
  constructor(public router: Router, public util: UtilService, public service: SharedServiceService, public formBuilder: FormBuilder) {
    this.setupLoginFormData();
  }

  ngOnInit(): void {
  }

  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
    this.hideImage = !this.hideImage
  }


  ShowPassword(event) {
    console.log('evemt', event.target.checked)
  }

  setupLoginFormData() {
    this.error_messages = {
      email: [
        { type: "required", message: '*Email is Required' },
        { type: "pattern", message: '*Please Enter valid Email' }
      ],
      password: [
        { type: "required", message: '*Password is Required' }
      ],
    };
    this.loginForm = this.formBuilder.group(
      {
        email: new FormControl("", Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),])),
        password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
          ])
        )
      }
    );
  }

  // login setup
  startClass() {
    let params = {
      "name": this.loginForm.value.email,
      "pass": this.loginForm.value.password
    }

    console.log('params', params);

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
    this.service.doLogin(params, { headers: headers }).then((result) => {
      console.log('result', result);
      console.log('result++', result['current_user']['csrf_token']);
      if (result['status'] == 200) {
        localStorage.setItem("csrftoken", result['current_user']['csrf_token']);
        localStorage.setItem("uid", result['current_user']['uid']);
        localStorage.setItem('userMail', result['current_user']['name']);
        localStorage.setItem('isLogin', '1');
        this.util.openSnackBarSuccess(result['message']);
        this.router.navigate(['/sidebar']);
      }
      else {
        this.util.openSnackBar(result['mesaage']);
      }
    })
      .catch(error => {
        console.log('getting some error', error);
        this.util.openSnackBar(error['message']);
      })
  }

  //reset password
  resetPassword() {
    this.router.navigate(['/forgot-password']);
  }
}