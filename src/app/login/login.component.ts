import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { UtilService } from '../../providers/util.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isChecked: boolean = false;
  hideImage: boolean = true;
  isTextFieldType: boolean;

  myemail: any = '';
  mypassword: any = '';
  selectpayment: any = '';
  loginForm: FormGroup;
  error_messages: any = '';
  userDetails: any = '';
  // cookieDetails: any = '';
  constructor(public router: Router, public util: UtilService, public service: SharedServiceService,
    public formBuilder: FormBuilder, public cookie: CookieService) {
    this.setupLoginFormData();
    // this.cookieDetails = this.cookie.getAll();
    // console.log('this.cookie/Details++1', this.cookieDetails);
  }

  ngOnInit(): void {
    this.getmy();
  }

  selectPaymentmethod(event) {
    console.log('selectpayment', this.selectpayment)
  }

  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
    this.hideImage = !this.hideImage
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
        ),
      }
    );
  }

  //reset password
  resetPassword() {
    this.router.navigate(['/forgot-password']);
  }

  userType(event) {
    this.userDetails = event.target.value;
  }

  rememberMe() {
    this.isChecked = !this.isChecked;
    if (this.isChecked == true) {
      localStorage.setItem('setEmail', this.loginForm.value.email);
      localStorage.setItem('setPassword', this.loginForm.value.password);
    }
  }

  getmy() {
    this.myemail = localStorage.getItem('setEmail');
    this.mypassword = localStorage.getItem('setPassword');
  }

  // do login
  login() {
    if (this.userDetails == '') {
      this.util.errorAlertPopup('please select user type');
      return
    }

    const data = {
      name: this.loginForm.value.email,
      pass: this.loginForm.value.password,
      // userType: this.userDetails

    }
    this.service.post('user/login', data, 0).subscribe(result => {
      console.log('result', result);
      try{
        if (result['status'] == 200) {
          console.log('result', result['current_user']['csrf_token'])
          localStorage.setItem("csrftoken", result['current_user']['csrf_token']);
          localStorage.setItem("uid", result['current_user']['uid']);
          localStorage.setItem('userMail', result['current_user']['name']);
          localStorage.setItem('isLogin', '1');
          localStorage.setItem('Authorization', result['current_user']['basic_auth_token'])
          this.util.showSuccessAlert(result['message']);
          // this.cookieDetails = this.cookie.getAll();
          // console.log('this.cookieDetails++2', this.cookieDetails);
          this.router.navigate(['/sidebar']);
        }
        else {
          this.util.errorAlertPopup(result.error_message);
        }
      }

      catch(error){
        this.util.errorAlertPopup(result.error_message);
        console.log('Exception',error)
      }
     
    })
  }
}