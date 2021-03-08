import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../providers/util.service';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})

export class ClassListComponent implements OnInit {
  isLoadingBool: boolean = true;
  allClassesList: any = [];

  constructor(public service: SharedServiceService, public util: UtilService) {
    this.getAllClassesList();
  }

  ngOnInit(): void {
  }

  // get all courses list
  getAllClassesList() {
    this.isLoadingBool = true;
    this.service.post('view-all-learners-api', '', 1).subscribe(result => {
      console.log('result++', result);
      this.isLoadingBool = false;
      this.allClassesList = result;
    })
  }
}