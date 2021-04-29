import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reorder-screen',
  templateUrl: './reorder-screen.component.html',
  styleUrls: ['./reorder-screen.component.css']
})
export class ReorderScreenComponent implements OnInit {
  isLoadingBool:boolean=false;
  constructor() { }

  ngOnInit() {
  }

}
