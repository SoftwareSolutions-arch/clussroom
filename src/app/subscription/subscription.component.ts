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
  constructor(public router: Router, public http: HttpClient, public service: SharedServiceService) {
    this.nidKey = localStorage.getItem('nidKey');
    console.log('this.nidKey', this.nidKey);
  }

  ngOnInit(): void {
    this.getAllsubscriptionList();
  }


  // get all record list
  getAllsubscriptionList() {
    let params = {
      "step": "2",
      "package_nid": this.nidKey
    }

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
    this.service.getSubscriptionList(params, { headers: headers }).then((result) => {
      this.isImageShow = false;
      this.subscriptionDetails = result['nids']['0'];
    })
      .catch(error => {
      })
  }

  next() {
    if (this.termsCondition != true) {
      window.alert('please accept terms and condition');
    }

    else {
      this.router.navigate(['/invoice']);
    }

  }

  back() {
    this.router.navigate(['/pricing']);
  }

  agreeTerms(event) {
    // console.log('event++++++++++++',event)
    console.log('event++++++++++++', event.target.checked);
    this.termsCondition = event.target.checked
  }
}
