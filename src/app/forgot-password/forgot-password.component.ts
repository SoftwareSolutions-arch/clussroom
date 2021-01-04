import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { UtilService } from '../../providers/util.service'
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  error_messages: any = '';
  constructor(public router: Router, public formBuilder: FormBuilder, public util: UtilService, public service: SharedServiceService) {
    this.setupLoginFormData();
  }

  ngOnInit(): void {
  }

  setupLoginFormData() {
    this.error_messages = {
      email: [
        { type: "required", message: '*Email is Required' },
        { type: "pattern", message: '*Please Enter valid Email' }
      ],
    };
    this.forgotForm = this.formBuilder.group(
      {
        email: new FormControl("", Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),]))
      }
    );
  }

  //get forgot password
  sendMail() {
    let params = {
      "email": this.forgotForm.value.email,
      "step": 1
    }

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
    this.service.getforgotPassword(params, { headers: headers }).then((result) => {
      // console.log('getForgotPassword++', result);
      if (result['message'] == "Otp Send") {
        console.log('reslut',result['id'])
        localStorage.setItem('otpId',result['id'])
        this.util.openSnackBarSuccess(result['message'])
        this.router.navigate(['/otp']);
      }
      else {
        this.util.openSnackBar(result['message']);
      }
    })
      .catch(error => {
      })
  }
}
