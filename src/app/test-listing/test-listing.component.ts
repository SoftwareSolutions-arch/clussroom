import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-test-listing',
  templateUrl: './test-listing.component.html',
  styleUrls: ['./test-listing.component.css']
})
export class TestListingComponent implements OnInit {
  classId: any = '';
  testAllData: any = '';
  isLoadingBool: boolean = true;

  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 10;
  constructor(public service: SharedServiceService, private router: Router) {
    this.classId = this.router.getCurrentNavigation().extras.state;
    this.getTestListing();
  }

  ngOnInit(): void {
  }

  //
  myFunction() {
    document.getElementById("mytstdown").classList.toggle("show");
    window.onclick = function (event) {
      if (!event.target.matches('.tstbtn')) {
        var dropdowns = document.getElementsByClassName("tstdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }
  }

  // get test listing data
  getTestListing() {
    this.isLoadingBool = true;
    let params = {
      "class_id": this.classId.data
    }

    this.service.post('test-list-api', params, 1).subscribe(result => {
      console.log('result++p', result);
      this.testAllData = result.test_data
      this.isLoadingBool = false;
    })
  }

  // handling page events
  handlePageChange(event): void {
    this.page = event;
  }
}