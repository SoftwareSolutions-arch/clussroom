import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  loginForm: FormGroup;
  error_messages: any = '';
  constructor(public router: Router, public snackBar: MatSnackBar, public service: SharedServiceService, public formBuilder: FormBuilder) {
    this.setupLoginFormData();
  }

  ngOnInit(): void {
  }


  openSnackBar(message) {
    this.snackBar.open(message, 'Try again', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,

    });
  }

  setupLoginFormData() {
    this.error_messages = {
      companyName: [
        { type: "required", message: '*Company Name is Required' }
      ],
      firstName: [
        { type: "required", message: '*First Name is Required' }
      ],
    };
    this.loginForm = this.formBuilder.group(
      {
        companyName: new FormControl(
          "",
          Validators.compose([
            Validators.required
          ])
        ),
        firstName: new FormControl(
          "",
          Validators.compose([
            Validators.required
          ])
        )
      }
    );
  }


  // login setup
  startClass() {
    let params = {
      "name": this.loginForm.value.companyName,
      "pass": this.loginForm.value.firstName
    }

    console.log('params', params)

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
    this.service.doLogin(params, { headers: headers }).then((result) => {
      console.log('login++', result);
      this.openSnackBar(result['mesaage']);
      if (result['mesaage'] == "User Not Valid") {
      }
      else {
        this.openSnackBar('Login Successfully');
        this.router.navigate(['/home']);
      }

    })
      .catch(error => {
      })
  }

}
