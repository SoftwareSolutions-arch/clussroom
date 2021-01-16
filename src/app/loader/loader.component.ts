import { Component, OnInit } from '@angular/core';
import { constants } from 'buffer';
import {UtilService} from '../../providers/util.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  isLoadingBool:boolean=false;
  constructor(public util:UtilService) { }

  ngOnInit(): void {
  }

}
