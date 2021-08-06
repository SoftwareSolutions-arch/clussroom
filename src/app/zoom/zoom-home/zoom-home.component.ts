import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';

@Component({
  selector: 'app-zoom-home',
  templateUrl: './zoom-home.component.html',
  styleUrls: ['./zoom-home.component.css']
})
export class ZoomHomeComponent implements OnInit {
  connectZoomList: any;

  constructor(private service:SharedServiceService,private router:Router) { }

  ngOnInit(): void {
    this.getConnectZoom();
  }
   getConnectZoom(){
     const data ={

     }
   this.service.post('zoom-connect-listing',data,1).subscribe(res => {
    this.connectZoomList = res.connect_zoom_options
   })
   }

   connectZoom(id){
     const data = {
      "zoom_login_id":id
     }
     this.service.post('connect-zoom',data,1).subscribe(res => {
      if(res.status == 1){
        this.router.navigateByUrl('/zoom-user');
      }
     })
   }
   openTab(e){
    window.open(e, "_blank");
   }
}
