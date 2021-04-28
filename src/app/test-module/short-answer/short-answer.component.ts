import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-short-answer',
  templateUrl: './short-answer.component.html',
  styleUrls: ['./short-answer.component.css']
})
export class ShortAnswerComponent implements OnInit {
  isLoadingBool:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

}
