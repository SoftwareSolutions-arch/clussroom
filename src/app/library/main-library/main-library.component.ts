import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';
import { UtilService } from '../../../providers/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-library',
  templateUrl: './main-library.component.html',
  styleUrls: ['./main-library.component.css']
})
export class MainLibraryComponent implements OnInit {
  @ViewChild('addtest') private addtest: ElementRef;
  @ViewChild('addfolder') private addfolder: ElementRef;
  @ViewChild('addmaterial') private addmaterial: ElementRef;
  @ViewChild('deleteclosebutton') private deleteclosebutton: ElementRef;
  @ViewChild('editmodelbutton') private editmodelbutton: ElementRef;
  @ViewChild('editlibrary') private editlibrary: ElementRef;
  @ViewChild('attachments') attachment: any;

  isLoadingBool: boolean = true;
  mainLibraryData: any = [];
  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 10;
  libraryData: any = {
    folder_name: "",
    folder_colore: "",
    materials_type: 'folder',
    library_type: 'main',
    materialType: ''
  }
  selectedDataType: any = '';
  userId: any = '';
  allCourseList: any = '';
  allClassesData: any = '';
  selectedCategory: any = '';
  selectedClass: any = '';
  testAllData: any = '';
  selectedTest: any = '';

  ExteriorPicFile: any = [];
  ExteriorPicString: any = [];
  fileLists: any = [];
  fileList: File[] = [];
  listOfFiles: any[] = [];
  baseString: string = 'data:image/png;base64,';
  fileType: any = '';
  checkbox: any
  selectedLibraryData: any = '';
  editFoldername: any = '';
  main_library_upload_edit_permission: any = '';
  constructor(public service: SharedServiceService, private router: Router, public util: UtilService) {
    this.userId = localStorage.getItem('uid');
    this.getMainListing();
    this.getAllCoursesList();
    this.main_library_upload_edit_permission = localStorage.getItem('main_library_upload_edit_permission');

  }

  ngOnInit(): void {
  }

  isCourseCreated() {
    this.util.showSuccessToast("You don't have permission");
  }

  getMainListing() {
    let params = {
      "user_id": this.userId,
      "type": "main"
    }
    this.isLoadingBool = true;
    this.service.post('vendor_library_listing', params, 1).subscribe(result => {
      this.isLoadingBool = false;
      this.mainLibraryData = result.result;

    })
  }

  // handling page events
  handlePageChange(event): void {
    this.page = event;
  }

  // add folder to library
  createTest() {
    this.addfolder.nativeElement.click();
    this.addmaterial.nativeElement.click();
    this.isLoadingBool = true;
    let params = {
      folder_name: this.libraryData.folder_name,
      folder_colore: this.libraryData.folder_colore,
      materials_type: 'folder',
      library_type: 'main'
    }
    this.service.post('add-folder-to-libarary', params, 1).subscribe(result => {

      this.getMainListing();
      this.isLoadingBool = false;
    })
  }

  setColour(data) {
    this.libraryData.folder_colore = data;

  }

  createMaterial() {
    // 
  }

  typeData(data) {
    this.selectedDataType = data;
  }

  // get all courses list
  getAllCoursesList() {
    this.isLoadingBool = true;
    this.service.post('view-all-courses-api', '', 1).subscribe(result => {

      this.isLoadingBool = false;
      this.allCourseList = result['coursesdata'];
      if (result['status'] == 1) {
        this.allCourseList = result['coursesdata'];
      }
      else {
        this.util.errorAlertPopup(result['mesaage']);
      }
    })
  }

  // view classes
  viewAllCoursesList() {

    let params = {
      "course_id": this.selectedCategory.nid
    }
    this.isLoadingBool = true;
    this.service.post('view-all-classes-api', params, 1).subscribe(result => {

      this.isLoadingBool = false;
      if (result['status'] == 1) {
        this.allClassesData = result['classesdata'];
      }
      else {
        this.util.errorAlertPopup(result['message']);
      }
    })
  }

  // get test listing data
  getTestListing() {

    this.isLoadingBool = true;
    let params = {
      "class_id": this.selectedClass.nid
    }
    this.service.post('test-list-api', params, 1).subscribe(result => {

      this.isLoadingBool = false;
      this.testAllData = result.test_data;
    })
  }

  // add test from course and classes
  addTest() {
    this.addfolder.nativeElement.click();
    this.addmaterial.nativeElement.click();
    let params = {
      test_id: this.selectedTest.test_id,
      materials_type: 'test',
      library_type: 'personal'
    }

    this.isLoadingBool = true;
    this.service.post('add-folder-to-libarary', params, 1).subscribe(result => {

      this.getMainListing();
      this.isLoadingBool = false;
    })
  }

  picked(event: any) {

    this.fileLists=[];
    this.ExteriorPicString=[]
    this.fileLists = FileList = event.target.files;
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      const file: File = this.fileLists[i];
      this.ExteriorPicFile = file;
      this.handleInputChange(file); //turn into base64
      var selectedFile = event.target.files[i];
      this.fileList.push(selectedFile);
      this.listOfFiles.push(selectedFile.name)
    }

    this.attachment.nativeElement.value = '';
  }

  removeImage(index) {

    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    this.fileList.splice(index, 1);
    this.ExteriorPicString.splice(index, 1);
  }

  handleInputChange(files) {

    this.fileType = files.type

    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    var totalWords = files.type;
    // var afterSlashChars = totalWords.match(/\/([^\/]+)\/?$/)[1];
    this.fileType = totalWords.match('^[^/]+')[0];

    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    this.ExteriorPicString.push(base64result);

    this.addFile();
  }

  addFile() {
    this.addfolder.nativeElement.click();
    this.addmaterial.nativeElement.click();
    let params = {
      "materials_type": 'file',
      "library_type": 'main',
      "file_type":'file',
      "attachments_file": this.ExteriorPicString
    }

    this.isLoadingBool = true;
    this.service.post('add-folder-to-libarary', params, 1).subscribe(result => {

      this.getMainListing();
      this.isLoadingBool = false;
    })
  }

  moveToPage() {
    this.editmodelbutton.nativeElement.click();
    this.router.navigate(['/library/file-transfer']);
  }

  isCheckboxClicked(event, data) {

    this.selectedLibraryData = data;
    this.editFoldername = this.selectedLibraryData.name
  }

  deleteCourse() {
    this.deleteclosebutton.nativeElement.click();
    this.editmodelbutton.nativeElement.click();
    let params = {
      "type": this.selectedLibraryData.file_type,
      "id": this.selectedLibraryData.id
    }

    this.isLoadingBool = true;
    this.service.post('delete-library-data', params, 1).subscribe(result => {

      this.getMainListing();
      this.isLoadingBool = false;
    })
  }

  saveEditRecord() {
    this.editmodelbutton.nativeElement.click();
    this.editlibrary.nativeElement.click();
    let params = {
      "name": this.editFoldername,
      "materials_type": this.selectedLibraryData.file_type,
      "id": this.selectedLibraryData.id
    }
    this.isLoadingBool = true;
    this.service.post('edit-libarary-api', params, 1).subscribe(result => {

      this.getMainListing();
      this.isLoadingBool = false;
    })
  }

  // download library
  downloadLibrary() {

    this.editlibrary.nativeElement.click();
    let params = {
      "materials_type": this.selectedLibraryData.file_type,
      "id": this.selectedLibraryData.id
    }

    this.isLoadingBool = true;
    this.service.post('download-libarary-data', params, 1).subscribe(result => {

      this.isLoadingBool = false;
      window.open(result.pdf);
    })
  }
}