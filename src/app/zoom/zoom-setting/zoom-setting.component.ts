import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';

@Component({
  selector: 'app-zoom-setting',
  templateUrl: './zoom-setting.component.html',
  styleUrls: ['./zoom-setting.component.css']
})
export class ZoomSettingComponent implements OnInit {
  pid: any;
  connectButton: boolean =true;
  disconnectButton: boolean =false;
  isLoadingBool: boolean = true;
  codeId: any;
  connectZoomList: any;
  connectZoomId: any;

  constructor(private service: SharedServiceService,private router:Router,private util:UtilService,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.codeId = params['code'];
    });
   }

  ngOnInit(): void {
    this.getMettingId();
    this.cLLBackZoom();
  }
  // get personal metting id
  getMettingId() {
    const data = {}
    this.service.post('zoom-user-details', data, 1).subscribe(res => {
      this.isLoadingBool = false;
      this.pid = res
    })
  }

  // edit profile
  editProfile(e){
    window.open(e, "_blank");
  }

  // logout profile
  logout(){
    const data = {}
    this.service.post('disconnect-zoom', data, 1).subscribe(res => {
      if (res.status == 1) {
        this.util.showSuccessAlert('Logged out successfully')
        this.connectButton = false;
        this.disconnectButton = true
      }
    })
  }
      // call back zoom api
      cLLBackZoom() {
        const data = {
          code: this.codeId
        }
        this.service.post('zoom-callback-api', data, 1).subscribe(res => {
          //  this.connectZoomList = res.connect_zoom_options
        })
      }

   connectZoom(){
    const data = {
     "zoom_login_id":this.connectZoomId
    }
    this.service.post('connect-zoom',data,1).subscribe(res => {
      this.connectButton = true;
     if(res.status == 1){
       this.router.navigateByUrl('/zoom-user');
     }
    })
  }
  getConnectZoom(){
    const data ={

    }
  this.service.post('zoom-connect-listing',data,1).subscribe(res => {
   this.connectZoomList = res.connect_zoom_options
   this.connectZoomId = res.connect_zoom_options.id

  })
  }
}
