import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm:FormGroup;
  error_messages: any = '';
  constructor(public router: Router,public formBuilder: FormBuilder) {
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

  sendMail(){
    this.router.navigate(['/change-password']);
  }
}
