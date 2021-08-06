import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-session-message',
  templateUrl: './live-session-message.component.html',
  styleUrls: ['./live-session-message.component.css']
})
export class LiveSessionMessageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  myFunction() {
    document.getElementById("myDropdown").classList.toggle("zoom-show");
  }
}
