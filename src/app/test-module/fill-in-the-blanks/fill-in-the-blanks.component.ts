import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fill-in-the-blanks',
  templateUrl: './fill-in-the-blanks.component.html',
  styleUrls: ['./fill-in-the-blanks.component.css']
})
export class FillInTheBlanksComponent implements OnInit {
  isLoadingBool:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}
