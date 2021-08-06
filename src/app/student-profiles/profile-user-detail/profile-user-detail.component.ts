import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from 'src/app/shared-service.service';

@Component({
  selector: 'app-profile-user-detail',
  templateUrl: './profile-user-detail.component.html',
  styleUrls: ['./profile-user-detail.component.css']
})
export class ProfileUserDetailComponent implements OnInit {
  profileData: any;
  isLoadingBool = true
  constructor(private service: SharedServiceService) { }

  ngOnInit() {
    this.getProfile();
  }
  getProfile() {
    const data = {
      "user_id":localStorage.getItem('uid')
    }
    this.service.post('user-profile-api', data, 1).subscribe(res => {
      this.profileData = res.result
      this.isLoadingBool = false
    })
  }
}
