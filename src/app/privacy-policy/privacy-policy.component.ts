import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../providers/util.service';
import { SharedServiceService } from '../shared-service.service';
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  isLoadingBool: boolean = true;
  privacyPoliyData: any = ''
  constructor(public util: UtilService, public service: SharedServiceService) {
    this.allPrivacyPoliyData();
  }

  ngOnInit(): void {
  }

  // all privacy policy data
  allPrivacyPoliyData() {
    this.isLoadingBool = true;
    let params = {
      "page": "privacy_policy"
    }
    this.service.post('all-content', params, 0).subscribe(result => {
      console.log('resulr privacyPoliyData', result);
      this.isLoadingBool = false;
      if (result['status'] == 1) {
        this.privacyPoliyData = result.content
      }
      else {
        this.util.errorAlertPopup(result['mesaage']);
      }
    })
  }
}
