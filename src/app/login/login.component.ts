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

  myemail: any='';
  mypassword: any='';
  isChecked: boolean = false;

  selectpayment: any = '';
  loginForm: FormGroup;
  error_messages: any = '';
  isTextFieldType: boolean;
  hideImage: boolean = true;
  userDetails: any = '';
  constructor(public router: Router, public util: UtilService, public service: SharedServiceService, public formBuilder: FormBuilder) {
    this.setupLoginFormData();
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

  // do login
  startClass() {
    if (this.userDetails == '') {
      this.util.errorAlertPopup('please select user type');
    }

    else{
      let params = {
        "name": this.loginForm.value.email,
        "pass": this.loginForm.value.password
      }
      let headers = new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
      this.service.doLogin(params, { headers: headers }).then((result) => {
        if (result['status'] == 200) {
          localStorage.setItem("csrftoken", result['current_user']['csrf_token']);
          localStorage.setItem("uid", result['current_user']['uid']);
          localStorage.setItem('userMail', result['current_user']['name']);
          localStorage.setItem('isLogin', '1');
          this.util.showSuccessAlert(result['message']);
          this.router.navigate(['/sidebar']);
        }
        else {
          this.util.errorAlertPopup(result['mesaage']);
        }
      })
        .catch(error => {
          this.util.errorAlertPopup(error['message']);
        })
    }
    
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
    console.log('+++', localStorage.getItem('setEmail'))
    this.myemail =  localStorage.getItem('setEmail');
    this.mypassword =  localStorage.getItem('setPassword');
  }
}