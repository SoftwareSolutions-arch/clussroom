import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample04',
  templateUrl: './sample04.component.html',
  styleUrls: ['./sample04.component.css']
})
export class Sample04Component implements OnInit {
  user:any='user1';

  constructor() { }

  ngOnInit(): void {
  }

  courses(){
    this.user = 'user1';
  }

  classes() {
    this.user = 'user2';
  }

  classesList(){
    this.user = 'user3';
  }

  learner(){
    this.user = 'user4';
  }

  stroage(){
    this.user = 'user5';
  }

  admin(){
    this.user = 'user6';
  }

  liveSession(){
    this.user = 'user7';
  }

}
