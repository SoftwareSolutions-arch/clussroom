import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';
// import {
//   MatSnackBar,
//   MatSnackBarHorizontalPosition,
//   MatSnackBarVerticalPosition,
//   } from '@angular/material';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  termsCondition: boolean = false;
  nidKey: any = '';
  subscriptionDetails: any = {};
  isImageShow: boolean = true;
  title: any = '';
  constructor(public router: Router, public http: HttpClient, public service: SharedServiceService) {
    this.nidKey = localStorage.getItem('nidKey');
    this.title = localStorage.getItem('title');
    //
  }

  ngOnInit(): void {
    this.getAllsubscriptionList();
  }

  // go to the next page
  next() {
    if (this.termsCondition != true) {
      window.alert('please accept terms and condition');
    }

    else {
      this.router.navigate(['/invoice']);
    }

  }

  // back to the previous form
  back() {
    this.router.navigate(['/pricing']);
  }

  // check terms and condition accepted or not
  agreeTerms(event) {
    this.termsCondition = event.target.checked
  }

  // get all record list
  getAllsubscriptionList() {
    let data = {
      "step": "2",
      "package_nid": this.nidKey
    }

    this.service.post('vendor-registration', data, 0).subscribe(result => {
      console.log('result', result)
      this.isImageShow = false;
      this.subscriptionDetails = result['nids']['0'];
    })
  }

  // go to terms and condition page
  goToTermsUse() {
    this.router.navigate(['terms-of-use']);
  }
  // go to privacy page
  goToPrivacyPolicy() {
    this.router.navigate(['privacy-policy']);
  }
}
