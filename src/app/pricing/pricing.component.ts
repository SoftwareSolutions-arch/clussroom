import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SharedServiceService } from '../shared-service.service'
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  firstNid: any = {};
  secondNid: any = {};
  thirdNid: any = {};
  fourthNid: any = {};
  fifthNid: any = {};
  currentPage: boolean = true;
  previousPage: boolean = false;
  isImageShow: boolean = true;

  constructor(public router: Router, private http: HttpClient, public service: SharedServiceService) {
    this.getAllRecordList();
  }

  ngOnInit(): void {
  }

  next() {
    this.currentPage = false;
  }

  previous() {
    this.currentPage = true;
  }

  // go to the subscription page
  startClass(data) {
    localStorage.setItem('nidKey', data);
    this.router.navigate(['/subscription']);
  }

  // get all record list
  getAllRecordList() {
    let params = {
      "step": "1",
    }

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
    this.service.getRecordList(params, { headers: headers }).then((result) => {
      console.log('result',result);
      this.isImageShow = false;
      this.firstNid = result['nids']['34'];
      this.secondNid = result['nids']['35'];
      this.thirdNid = result['nids']['36'];
      this.fourthNid = result['nids']['131'];
      this.fifthNid = result['nids']['178'];
    })
      .catch(error => {
      })
  }
}
