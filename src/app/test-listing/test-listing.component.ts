import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';
import { UtilService } from '../../providers/util.service';

@Component({
  selector: 'app-test-listing',
  templateUrl: './test-listing.component.html',
  styleUrls: ['./test-listing.component.css']
})
export class TestListingComponent implements OnInit {
  isTestSelected:boolean=false
  classId: any = '';
  testAllData: any = '';
  isLoadingBool: boolean = true;

  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 10;

  SettingsData: any = {
    test_name: '',
    instruction: '',
    test_available_from: '',
    // test_availble_from_time: '',
    test_available_to: '',
    // test_availble_to_time: '',
    timer: '',
    timer_time: '',
    attempts: '',
    // attempts_score: '',
    pagination: '',
    view_ans_after_compliation: '',
    class_nid: ''
  }
  constructor(public service: SharedServiceService, public util: UtilService, private router: Router) {
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
      this.testAllData = result.test_data
      this.isLoadingBool = false;
    })
  }

  // handling page events
  handlePageChange(event): void {
    this.page = event;
  }

  // confirm add test
  confirm() {
    this.SettingsData.class_nid = this.classId.data;
    var x = new Date(this.SettingsData.test_available_from);
    var y = new Date(this.SettingsData.test_available_to);

    if (x > y) {
      this.util.errorAlertPopup('start date should be less than end date');
    }
    else {
      this.isLoadingBool = true;
      this.service.post('add-test-api', this.SettingsData, 1).subscribe(result => {
        this.isLoadingBool = false;
        this.getTestListing();
      })
    }
  }
  
  testClicked(){
    this.isTestSelected=false;
  }

  settingsClicked(){
    this.isTestSelected=false;
  }

  assignmentClicked(){
    this.isTestSelected=true;
  }


}