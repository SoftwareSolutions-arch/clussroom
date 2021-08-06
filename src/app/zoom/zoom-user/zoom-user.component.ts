import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';

@Component({
  selector: 'app-zoom-user',
  templateUrl: './zoom-user.component.html',
  styleUrls: ['./zoom-user.component.css']
})
export class ZoomUserComponent implements OnInit {
  connectButton: boolean = true;
  connectZoomList: any;
  codeId: any;
  disconnectButton: boolean = false;
  isLoadingBool: boolean = false;

  constructor(private service: SharedServiceService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.codeId = params['code'];
    });
  }

  ngOnInit(): void {
    this.cLLBackZoom();
    this.getConnectZoom();
  }
  //  getting zoom list
  connectZoom(id) {
    this.isLoadingBool = true
    const data = {
      "zoom_login_id": id
    }
    this.service.post('connect-zoom', data, 1).subscribe(res => {
      this.isLoadingBool = false
      if (res.status == 1) {
        this.disconnectButton = true
        this.connectButton = false;
      }
    })
  }

  //  disconnect zoom
  disconnectZoom() {
    const data = {}
    this.service.post('disconnect-zoom', data, 1).subscribe(res => {
      if (res.status == 1) {
        this.connectButton = true;
        this.disconnectButton = false

      }
    })
  }
  //  connect zoom
  getConnectZoom() {
    const data = {}
    this.service.post('zoom-connect-listing', data, 1).subscribe(res => {
      this.connectZoomList = res.connect_zoom_options
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
}
