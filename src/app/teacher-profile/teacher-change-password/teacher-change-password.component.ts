import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-teacher-change-password',
  templateUrl: './teacher-change-password.component.html',
  styleUrls: ['./teacher-change-password.component.css']
})
export class TeacherChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup = new FormGroup({})
  submit: boolean = false;
  show: boolean = false;
  errMsg: boolean = false;
isLoadingBool = false;

  constructor(private service: SharedServiceService, private util: UtilService, private fb: FormBuilder) {
    this.changePasswordForm = fb.group({
      oldPass: new FormControl('', Validators.required),
      newPass: new FormControl('', [
        Validators.required,
        // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]
      ]
      ),
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('newPass', 'confirm_password')
    })
  }

  ngOnInit() {
  }
  get fn() { return this.changePasswordForm.controls; }
  changePassword() {
    this.submit = true;
    if (this.changePasswordForm.invalid) {
      return;
    } else {
      this.isLoadingBool = true;
      const data = {
        "old_pass": this.changePasswordForm.value.oldPass,
        "new_pass": this.changePasswordForm.value.newPass
      }
      this.service.post('change-password-api', data, 1).subscribe(res => {
      this.isLoadingBool = false;
        if (res.message == 'Old Password Not Match') {
          this.errMsg = true
        }
        if (res.message == 'success') {
          this.util.showSuccessToast('Password changed successfully.')
          this.changePasswordForm.reset()
        }
      })
    }
  }
  // show and hide password
  password() {
    this.show = !this.show;
  }
  clearMsg() {
    this.errMsg = false;
  }
}
