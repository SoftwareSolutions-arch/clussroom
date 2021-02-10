import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  slides = [
    {text: 'Clussroom is neatly organised and I did not take much downtime to navigate around and familiarise myself with what needs to be done!', name: 'Sarah Teo'},
    {text: 'With Clussroo, I can have the singular focus to transmit transmit what I needed to teach the students. That leaves me with more time for organising materials.', name: 'Randy Woo'},
    {text: 'Clussroom is neatly organised and I did not take much downtime to navigate around and familiarise myself with what needs to be done!', name: 'Sarah Teo'},
    {text: 'With Clussroo, I can have the singular focus to transmit transmit what I needed to teach the students. That leaves me with more time for organising materials.', name: 'Randy Woo'},
    {text: 'Clussroom is neatly organised and I did not take much downtime to navigate around and familiarise myself with what needs to be done!', name: 'Sarah Teo'},
    {text: 'With Clussroo, I can have the singular focus to transmit transmit what I needed to teach the students. That leaves me with more time for organising materials.', name: 'Randy Woo'},
  ];

  slideConfig = {"slidesToShow": 2, "slidesToScroll": 1, "rows": 1, "arrows": false, "dot": false};
  
  addSlide() {
    this.slides.push({text: "text", name: "name"})
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  startClass(){
    // this.router.navigate(['/sample04']);
  }

}
