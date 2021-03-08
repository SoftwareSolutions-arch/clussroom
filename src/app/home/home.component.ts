import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../../providers/util.service';
import { SharedServiceService } from '../shared-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contentData: any = '';
  isLoadingBool: boolean = true;
  isLogin: any = '';

  constructor(public router: Router, public util: UtilService, public service: SharedServiceService) {
    this.allHomeContentData();
    this.isLogin = localStorage.getItem('isLogin');
  }

  ngOnInit(): void {
  }

  slideConfig = { "slidesToShow": 2, "slidesToScroll": 1, "rows": 1, "arrows": false, "dot": false };

  startClass() {
    this.router.navigate(['/sample04']);
  }

  // all home content data 
  allHomeContentData() {
    this.isLoadingBool = true;
    let params = {
      "page": "home"
    }
    this.service.post('all-content', params, 0).subscribe(result => {
      this.isLoadingBool = false;
      if (result['status'] == 1) {
        this.contentData = result.content
      }
      else {
        this.util.errorAlertPopup(result['mesaage']);
      }
    })
  }

  loginAlert() {
    this.util.errorAlertPopup('You must have to login first')
  }
}
