import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router) { }

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
}
