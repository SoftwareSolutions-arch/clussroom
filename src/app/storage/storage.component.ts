import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showHideRow(table) {
    console.log("Hello", table)
    $("#" + table).toggle();
  }
}
