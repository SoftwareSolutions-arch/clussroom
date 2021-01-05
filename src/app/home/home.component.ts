import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  slides = [
    {text: 'No other eCommerce platform allows people to start for free and grow their store as their business grows.', name: 'Rubika'},
    {text: 'No other eCommerce platform allows people to start for free and grow their store as their.', name: 'Rubika'},
    {text: 'No other eCommerce platform allows people to start for.', name: 'Rubika'},
    {text: 'No other eCommerce platform allows people to start for free and grow their store as their.', name: 'Rubika'},
    {text: 'No other eCommerce platform allows people to start for free and grow their.', name: 'Rubika'},
    {text: 'No other eCommerce platform allows.', name: 'Rubika'}
  ];

  slideConfig = {"slidesToShow": 2, "slidesToScroll": 1, "rows": 1, "arrows": false, "dot": false};
  
  addSlide() {
    this.slides.push({text: "text", name: "name"})
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

}
