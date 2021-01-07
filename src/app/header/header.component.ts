import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
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
    this.router.navigate(['/sidebar']);
  }

  logIn() {
    this.router.navigate(['/login']);
  }

  // logout setup
  logout() {
    let params={
      'csrf_token': this.csrftoken
    }
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
    this.service.doLogout(params,{ headers: headers }).then((result) => {
      console.log('logout++', result);
      if (result['status'] == 200) {
        localStorage.clear();
        this.router.navigate(['/login']);
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

  packages() {
    this.router.navigate(['/pricing']);
  }
}
