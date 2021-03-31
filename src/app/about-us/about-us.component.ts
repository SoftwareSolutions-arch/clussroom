import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../providers/util.service';
import { SharedServiceService } from '../shared-service.service';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  aboutUsData: any = '';
  isLoadingBool: boolean = true;
  constructor(public util: UtilService, public service: SharedServiceService) {
    this.allAboutData();
  }

  ngOnInit(): void {
  }

  // all about data
  allAboutData() {
    this.isLoadingBool = true;
    let params = {
      "page": "aboutus"
    }
    this.service.post('all-content', params, 0).subscribe(result => {
      
      this.isLoadingBool = false;
      if (result['status'] == 1) {
        this.aboutUsData = result.content
      }
      else {
        this.util.errorAlertPopup(result['mesaage']);
      }
    })
  }

}
