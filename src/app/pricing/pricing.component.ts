import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SharedServiceService } from '../shared-service.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})


export class PricingComponent implements OnInit {

  @ViewChild('slickModal') slickModal: SlickCarouselComponent;

  firstNid: any = {};
  secondNid: any = {};
  thirdNid: any = {};
  fourthNid: any = {};
  fifthNid: any = {};
  currentPage: boolean = true;
  previousPage: boolean = false;
  isImageShow: boolean = true;
  recordList: any = [];

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "autoplay": true,
    "dots": false,
    "arrows": true
  };

  constructor(public router: Router, private http: HttpClient, public service: SharedServiceService) {
    this.getAllRecordList();
  }

  ngOnInit(): void {
  }

  previous() {
    this.currentPage = true;
  }

  // go to the subscription page
  startClass(data) {
    console.log('data',data)
    localStorage.setItem('nidKey', data.nid);
    localStorage.setItem('title', data.title);
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
      console.log('result', result);
      if (result['status'] == '1') {
        this.isImageShow = false;
        this.recordList = result['nids'];
      }
    })
      .catch(error => {
      })
  }

  addSlide() {
    this.recordList.length = this.recordList.length + 1;
  }

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }
}