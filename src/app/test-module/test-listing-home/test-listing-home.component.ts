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
  @ViewChild('steponelibrary') steponelibrary;
  @ViewChild('copytest') copytest;
  @ViewChild('steptwolibrary') steptwolibrary;
  @ViewChild('stepthreelibrary') stepthreelibrary;
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
  liabraryData = [];
  classData: any = '';
  testData: any = '';
  classesId: any = '';
  step4TestId: any = '';
  headerData: any = '';

  selectTestLiabrary: any = '';
  testLibraryData: any = '';
  showYesButton: boolean = false;
  constructor(public service: SharedServiceService, private toastr: ToastrService, public util: UtilService, private router: Router) {
    this.classId = localStorage.getItem('classListId');
    this.getTestListing();
    this.getDashboardHeaderData();

  }


  getDashboardHeaderData() {
    this.headerData = '';
    let params = {
      "class_id": this.classId
    }
    this.service.post('class-material-dashboard-api', params, 1).subscribe(result => {

      this.headerData = result
      this.isLoadingBool = false;
    })
  }

  goTotest() {
    this.router.navigate(['/test/test-listing-home']);
  }

  goToAssignment() {
    this.router.navigate(['/assignment/test-assignment-home']);
  }

  goToClassMaterial() {
    this.router.navigate(['/class-material/assignment-detail']);
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
    this.toastr.error('Please select row');
  }

  // get test listing data
  getTestListing() {
    this.isLoadingBool = true;
    let params = {
      "class_id": this.classId
    }

    this.service.post('test-list-api', params, 1).subscribe(result => {

      if (result.test_data == "No Test Available") {
        this.toastr.error('No test available');
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

    if (this.isEditClicked == true) {
      this.router.navigate(["/test/settings-tabs"]);
    }

    else {
      this.util.errorAlertPopup('Please select test');
    }

  }

  goToTestAssessment() {
    this.router.navigate(['/test/test-assessment']);
  }

  addNew() {
    this.router.navigate(["/test/test-settings"]);
  }


  // get events of check box for edit or add button show and hide 
  isCheckBoxClicked(testListing, i) {
    console.log('testListing', testListing);
    this.isEditClicked = true;
    localStorage.setItem('test_name', testListing.test_name)
    localStorage.setItem('test_id', testListing.test_id);
    this.testId = testListing.test_id;
  }

  goToTest() {
    this.deleteclosebutton.nativeElement.click();
    this.router.navigate(['/test/question-screen'])
  }

  // Delete test step 2
  deleteTest() {
    let params = {
      "step": 2,
      "test_id": [this.testId]
    }

    this.isLoadingBool = true;
    this.service.post('delete-test-api', params, 1).subscribe(result => {

      this.isLoadingBool = false;
      this.deleteclosebutton.nativeElement.click();
      this.getTestListing();
      this.getDashboardHeaderData();
    })
  }


  // copy test to library 

  copyTestToLibrary(data) {
    this.selectTestLiabrary = data;
    this.liabraryData = [];
    let params = {
      "step": "3",
      "test_id": this.testId,
      "class_id_for_add_test": this.classId,
      "library_for_add_test": data
    }
    
    console.log('params', params);
    this.isLoadingBool = true;
    this.service.post('copy-test-api', params, 1).subscribe(result => {
      console.log('result', result);
      this.isLoadingBool = false;
      if(result.status==1){
        this.util.showSuccessToast('Test copied successfully');
        this.copytest.nativeElement.click();
      }
    })
  }

  //step 1
  addTestFromLiabrary(data) {
    this.steponelibrary.nativeElement.click();
    this.selectTestLiabrary = data;
    this.liabraryData = [];
    let params = {
      "step": "1",
      "library": data
    }
    this.isLoadingBool = true;
    this.service.post('add-test-from-libarary-api', params, 1).subscribe(result => {
      this.isLoadingBool = false;
      this.liabraryData = result.coursesdata
    })
  }

  //step 2
  addTestFromLiabrary2(data) {
    this.steptwolibrary.nativeElement.click();
    this.testData=[];
    this.classData=[];
    this.testLibraryData = data.course_name
    let params = {
      "step": "2",
      "course_id": data.course_id
    }
    this.isLoadingBool = true;
    this.service.post('add-test-from-libarary-api', params, 1).subscribe(result => {

      this.isLoadingBool = false;

      this.classData = result.classdata
      // this.deleteclosebutton.nativeElement.click();
    })
  }

  addTestFromLiabrary3(item) {
    this.isLoadingBool = true;
    this.classesId = item.nid;
    this.testData=[];
    let params = {
      "step": "3",
      "class_id": item.nid
    }
    this.service.post('add-test-from-libarary-api', params, 1).subscribe(result => {
      this.isLoadingBool = false;

      this.testData = result.testdata
      // this.deleteclosebutton.nativeElement.click();
    })
  }

  saveTestData(item) {
    this.showYesButton = true;
    this.step4TestId = item.nid
  }

  addTestFromLiabrary4() {
    this.isLoadingBool = true;
    let params = {
      "step": "4",
      "test_id": this.step4TestId,
      "class_id_for_add_test": this.classesId
    }

    this.service.post('add-test-from-libarary-api', params, 1).subscribe(result => {
      this.getTestListing();
      this.isLoadingBool = false;
      this.util.showSuccessAlert(result.message);
      this.steponelibrary.nativeElement.click();
      this.steptwolibrary.nativeElement.click();
      this.stepthreelibrary.nativeElement.click();
    })
  }
}