import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../providers/util.service';
import { SharedServiceService } from '../shared-service.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  isLoadingBool: boolean = true;
  contactUsData: any = '';

  constructor(public util: UtilService, public service: SharedServiceService) {
    this.allContactUsData();
  }

  ngOnInit(): void {
  }

  // all about data
  allContactUsData() {
    this.isLoadingBool = true;
    let params = {
      "page": "contactus"
    }
    this.service.post('all-content', params, 0).subscribe(result => {
      
      this.isLoadingBool = false;
      if (result['status'] == 1) {
        this.contactUsData = result.content
      }
      else {
        this.util.errorAlertPopup(result['mesaage']);
      }
    })
  }
}
