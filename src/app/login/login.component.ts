import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { UtilService } from '../../providers/util.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from '../loader/loader.component';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ischeckboxTrue: boolean = false;
  isChecked: boolean = false;
  hideImage: boolean = true;
  isTextFieldType: boolean;

  selectpayment: any = '';
  loginForm: FormGroup;
  error_messages: any = '';
  userDetails: any = '';
  constructor(public router: Router, private spinner: NgxSpinnerService, public loader: LoaderComponent,
    private toastr: ToastrService, public util: UtilService, public service: SharedServiceService,
    public formBuilder: FormBuilder) {
    this.setupLoginFormData();
  }

  ngOnInit(): void {
    this.setPassword();
  }

  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
    this.hideImage = !this.hideImage
  }


  setupLoginFormData() {
    this.error_messages = {
      email: [
        { type: "required", message: '*Required' },
        { type: "pattern", message: '*Please enter valid email' }
      ],
      password: [
        { type: "required", message: '*Required' }
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

  // user type
  userType(event) {
    this.userDetails = event.target.value;
  }

  // remember password
  rememberMe() {
    this.isChecked = !this.isChecked;
    if (this.isChecked == true) {
      localStorage.setItem('setEmail', this.loginForm.value.email);
      localStorage.setItem('setPassword', this.loginForm.value.password);
    }
    if (this.isChecked == false) {
      localStorage.setItem('setEmail', '');
      localStorage.setItem('setPassword', '');
    }
  }

  // set password
  setPassword() {
    this.loginForm.controls.email.setValue(localStorage.getItem('setEmail'));
    this.loginForm.controls.password.setValue(localStorage.getItem('setPassword'));
  }

  // do login
  login() {
    if (this.userDetails == '') {
      this.util.errorAlertPopup('Please select user type');
      return
    }

    else if (this.userDetails == 'teacher') {
      const data = {
        name: this.loginForm.value.email,
        pass: this.loginForm.value.password,
        user_type: this.userDetails

      }
      this.service.post('user/login', data, 0).subscribe(result => {
        
        try {
          if (result['status'] == 200) {
            this.getInstructionName();
            this.util.showSuccessToast(result['message']);;
            localStorage.setItem("csrftoken", result['current_user']['csrf_token']);
            localStorage.setItem("uid", result['current_user']['uid']);
            localStorage.setItem('userMail', result['current_user']['name']);
            localStorage.setItem('isLogin', '1');
            localStorage.setItem('Authorization', result['current_user']['basic_auth_token'])
            localStorage.setItem('add_learner_permission',result.permission.add_learner);
            localStorage.setItem('class_creation_permission',result.permission.class_creation);
            localStorage.setItem('class_deletion_permission',result.permission.class_delation);
            localStorage.setItem('course_creation_permission',result.permission.course_creation);
            localStorage.setItem('course_library_upload_edit_permission',result.permission.course_library_upload_edit);
            localStorage.setItem('live_session_permission',result.permission.live_session);
            localStorage.setItem('main_library_upload_edit_permission',result.permission.main_library_upload_edit);
            // this.util.showSuccessAlert(result['message']);
          }
          else {
            this.toastr.error(result.error_message);
            this.util.errorAlertPopup(result.error_message);
          }
        }
        catch (error) {
          this.util.errorAlertPopup(result.error_message);
        }
      })
    }

    else if (this.userDetails == 'learner') {
      const data = {
        name: this.loginForm.value.email,
        pass: this.loginForm.value.password,
        user_type: this.userDetails

      }
      this.service.post('user/login', data, 0).subscribe(result => {
        
        try {
          if (result['status'] == 200) {
            this.getInstructionName2();
            this.util.showSuccessToast(result['message']);;
            localStorage.setItem("csrftoken", result['current_user']['csrf_token']);
            localStorage.setItem("uid", result['current_user']['uid']);
            localStorage.setItem('userMail', result['current_user']['name']);
            localStorage.setItem('isLogin', '1');
            localStorage.setItem('Authorization', result['current_user']['basic_auth_token'])
            this.router.navigate(['/student/student-course']);
          }
          else {
            this.toastr.error(result.error_message);
            this.util.errorAlertPopup(result.error_message);
          }
        }
        catch (error) {
          this.util.errorAlertPopup(result.error_message);
        }
      })
    }
  }

  // get instruction name
  getInstructionName() {
    this.service.post('instruction-name-api', '', 0).subscribe(result => {
      localStorage.setItem('instructionName', result.instruction_name);
      this.router.navigate(['/sample04']);
    })
  }

  getInstructionName2() {
    this.service.post('instruction-name-api', '', 0).subscribe(result => {
      localStorage.setItem('instructionName', result.instruction_name);
      this.router.navigate(['/student/student-course']);
    })
  }
}
