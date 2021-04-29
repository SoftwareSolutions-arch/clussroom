import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-midterm-preview',
  templateUrl: './midterm-preview.component.html',
  styleUrls: ['./midterm-preview.component.css']
})
export class MidtermPreviewComponent implements OnInit {
  isLoadingBool:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}
