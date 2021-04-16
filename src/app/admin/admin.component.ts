import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isLoadingBool:boolean=false;
  instructionName:any='';

  constructor(public router: Router) { 
    this.instructionName=localStorage.getItem('instructionName')
  }

  ngOnInit(): void {
  }


  goToclasses(){
    this.router.navigate(['/classes']);
  }

   // navigate to courses tab
   goToCourses() {
    this.router.navigate(['/sample04']);
  }

  goToClassList() {
    this.router.navigate(['/classes-list']);
  }

  goToLearner(){
    this.router.navigate(['/learners']);
  }

  goToStroage(){
    this.router.navigate(['/storage']);
  }

  goToLiveSession() {
    this.router.navigate(['/live-session']);
  }

}
