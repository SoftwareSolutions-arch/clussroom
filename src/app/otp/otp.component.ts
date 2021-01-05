import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service'
import { ActivatedRoute, Params } from '@angular/router';
import { UtilService } from '../../providers/util.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  error_messages: any = '';
  otpId: any = '';
  otpForm: FormGroup;
  constructor(public formBuilder: FormBuilder, public util: UtilService, public router: Router, public service: SharedServiceService) {
    this.setupLoginFormData();
    this.otpId = localStorage.getItem('otpId');
  }

  ngOnInit(): void {
  }


  setupLoginFormData() {
    this.error_messages = {
      otp: [
        { type: "required", message: '*otp is Required' }]
    };
    this.otpForm = this.formBuilder.group(
      {
        otp: new FormControl(
          "",
          Validators.compose([
            Validators.required
          ])
        )
      }
    );

  }

  next() {
    this.router.navigate(['/change-password']);
  }

  // submit Otp 
  submitOtp() {
    let params = {
      "otp": this.otpForm.value.otp,
      "step": 2,
      "id": this.otpId
    }
    console.log('params', params)

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
    this.service.postOtp(params, { headers: headers }).then((result) => {
      console.log('postOtp++', result);
      if (result['message'] == "Otp Valid") {
        this.util.openSnackBarSuccess(result['message'])
        this.router.navigate(['/change-password']);
      }
      else {
        this.util.openSnackBar(result['message']);
      }
    })
      .catch(error => {
      })
  }
}
