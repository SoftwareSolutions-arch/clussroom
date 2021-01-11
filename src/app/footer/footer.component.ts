import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  contactUs(){
    this.router.navigate(['/contact-us']);
  }

  pricing(){
    this.router.navigate(['/pricing']);
  }

  about(){
    this.router.navigate(['/about-us']);
  }

}
