import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import { UtilService } from '../../providers/util.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: any = '';
  csrftoken: any = '';
  constructor(public router: Router, public util: UtilService, public service: SharedServiceService, public formBuilder: FormBuilder) {
    this.isLogin = localStorage.getItem('isLogin');
    this.csrftoken = localStorage.getItem('csrftoken');
  }

  ngOnInit(): void {
  }

  contactUs() {
    this.router.navigate(['/contact-us']);
  }

  aboutUs() {
    this.router.navigate(['/about-us']);
  }

  home() {
    this.router.navigate(['/home']);
  }

  logIn() {
    this.router.navigate(['/login']);
  }

  packages() {
    this.router.navigate(['/pricing']);
  }

  // do logout setup
  logout() {
    this.service.post('user-logout-api', '', 0).subscribe(result => {
      console.log('result', result)
      if (result['status'] == 1) {
        this.util.showSuccessAlert(result['status_message']);
        localStorage.removeItem('csrftoken');
        localStorage.removeItem('uid');
        localStorage.removeItem('userMail');
        localStorage.removeItem('isLogin');
        this.router.navigate(['/login']);
      }
      else {
        this.util.errorAlertPopup(result['status_message']);
      }
    })
  }
}
