import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-thanks-screen',
  templateUrl: './thanks-screen.component.html',
  styleUrls: ['./thanks-screen.component.css']
})
export class ThanksScreenComponent implements OnInit {
  userMail:any='';
  constructor(public router: Router) {
   this.userMail= localStorage.getItem('userMail');
   console.log('userMail',this.userMail);
   }

  ngOnInit(): void {
  }

  gotoDashboard(){
    this.router.navigate(['/home']);
  }

}
