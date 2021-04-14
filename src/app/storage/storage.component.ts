import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {
  instructionName:any='';
  isLoadingBool:boolean=false;
  constructor(public router: Router) {
    this.instructionName=localStorage.getItem('instructionName')
   }

  ngOnInit(): void {
  }

  showHideRow(table) {
    
    $("#" + table).toggle();
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
}
