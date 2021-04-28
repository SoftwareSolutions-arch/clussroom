import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-true-or-false',
  templateUrl: './true-or-false.component.html',
  styleUrls: ['./true-or-false.component.css']
})
export class TrueOrFalseComponent implements OnInit {
  isLoadingBool:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}
