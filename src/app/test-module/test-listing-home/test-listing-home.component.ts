import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../../shared-service.service';
import { UtilService } from '../../../providers/util.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test-listing-home',
  templateUrl: './test-listing-home.component.html',
  styleUrls: ['./test-listing-home.component.css']
})
export class TestListingHomeComponent implements OnInit {
  @ViewChild('deleteclosebutton') deleteclosebutton;
  @ViewChild('deleteTestModal') private deleteTestModal: ElementRef;

  isTestSelected: boolean = false
  classId: any = '';
  testAllData: any = '';
  isLoadingBool: boolean;

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
    class_nid: '',
    checkboxClicked: ''
  }

  testId: any = '';
  isEditClicked: boolean = false;
  liabraryData=[];
  classData:any='';
  constructor(public service: SharedServiceService, private toastr: ToastrService, public util: UtilService, private router: Router) {
    this.classId = localStorage.getItem('classListId');
    this.getTestListing();
  }

  ngOnInit() {
  }

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

  showErrorMessage() {
    this.toastr.error('please select row');
  }

  // get test listing data
  getTestListing() {
    this.isLoadingBool = true;
    let params = {
      "class_id": this.classId
    }

    this.service.post('test-list-api', params, 1).subscribe(result => {
      if (result.test_data == "No Test Available") {
        this.toastr.error(result.test_data);
        this.isLoadingBool = false;
      }
      else {
        this.testAllData = result.test_data
        this.isLoadingBool = false;
      }
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

  testClicked() {
    this.isTestSelected = false;
  }

  settingsClicked() {
    // this.isTestSelected = false;
    this.router.navigate(["/test/settings-tabs"]);
  }

  goToTestAssessment() {
    this.router.navigate(['/test/test-assessment']);
  }

  addNew() {
    this.router.navigate(["/test/test-settings"]);
  }


  // get events of check box for edit or add button show and hide 
  isCheckBoxClicked(testListing, i) {
    this.isEditClicked = true;
    console.log(testListing);
    this.testId = testListing.test_id;
  }

  goToTest() {
    console.log('this.testId', this.testId);
    this.deleteclosebutton.nativeElement.click();
    localStorage.setItem('test_id', this.testId);
    this.router.navigate(['/test/question-screen'])
  }

  // Delete test step 2
  deleteTest() {
    let params = {
      "step": 2,
      "test_id": [this.testId]
    }
    console.log('params', params);
    this.isLoadingBool = true;
    this.service.post('delete-test-api', params, 1).subscribe(result => {
      this.isLoadingBool = false;
      this.deleteclosebutton.nativeElement.click();
      this.getTestListing();
    })
  }

  //step 1
  addTestFromLiabrary(data) {
    let params = {
      "step": "1",
      "library": data
    }
    this.isLoadingBool = true;
    this.service.post('add-test-from-libarary-api', params, 1).subscribe(result => {
      this.isLoadingBool = false;
      console.log('result', result);
      this.liabraryData=result.coursesdata
      // this.deleteclosebutton.nativeElement.click();
    })
  }

  //step 2
  addTestFromLiabrary2(data) {
    console.log('data',data);
    let params = {
      "step": "2",
      "course_id": data.course_id
    }
    this.isLoadingBool = true;
    this.service.post('add-test-from-libarary-api', params, 1).subscribe(result => {
      this.isLoadingBool = false;
      console.log('result', result);
      this.classData=result.classdata
      // this.deleteclosebutton.nativeElement.click();
    })
  }

  getTest(item){
    console.log('itemm',item)

  }
  addTestFromLiabrary3(data){
    let params = {
      "step": "1",
      "library": data
    }
    this.isLoadingBool = true;
    this.service.post('add-test-from-libarary-api', params, 1).subscribe(result => {
      this.isLoadingBool = false;
      console.log('result', result);
      this.liabraryData=result.coursesdata
      // this.deleteclosebutton.nativeElement.click();
    })
  }

}