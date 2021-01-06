import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin:any='';
  constructor(public router: Router) {
    this.isLogin=localStorage.getItem('isLogin');
   }

  ngOnInit(): void {
  }

  contactUs(){
    this.router.navigate(['/contact-us']);
  }

  aboutUs(){
    this.router.navigate(['/about-us']);
  }

  home(){
    this.router.navigate(['/home']);
  }
  
  logIn() {
    this.router.navigate(['/login']);
  }

  logout() {
    localStorage.clear();
    window.location.reload();
    this.router.navigate(['/login']);
  }

  packages(){
    this.router.navigate(['/pricing']);
  }
}
