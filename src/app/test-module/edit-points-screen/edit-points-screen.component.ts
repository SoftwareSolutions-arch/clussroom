import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-points-screen',
  templateUrl: './edit-points-screen.component.html',
  styleUrls: ['./edit-points-screen.component.css']
})
export class EditPointsScreenComponent implements OnInit {
  isLoadingBool:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

}
