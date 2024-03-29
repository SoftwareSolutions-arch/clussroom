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

  isLoadingBool: boolean = false;
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
  classId: any = '';
  
  constructor(public service: SharedServiceService, private router: Router, public util: UtilService) {
    this.userId = localStorage.getItem('uid');
    this.classId = localStorage.getItem('classListId');

    this.getMainListing();
    this.getAllCoursesList();
  }

  ngOnInit(): void {
  }

  getMainListing() {
    let params = {
      "user_id": this.userId,
      "type": "course"
    }
    this.isLoadingBool = false;
    this.service.post('vendor_class_materials_listing', params, 1).subscribe(result => {
      
      this.isLoadingBool = false;
      this.mainLibraryData = result.result;
    })
  }

  getTestListing() {
    this.isLoadingBool = false;
    let params = {
      "class_id": this.selectedClass.nid
    }
    this.service.post('test-list-api', params, 1).subscribe(result => {
      this.isLoadingBool = false;
      this.testAllData = result.test_data;
    })
  }

  // handling page events
  handlePageChange(event): void {
    this.page = event;
  }

  setColour(data) {
    this.libraryData.folder_colore = data;
  }

  createMaterial() {
  }

  typeData(data) {
    this.selectedDataType = data;
  }

  // get all courses list
  getAllCoursesList() {
    this.isLoadingBool = false;
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
    this.isLoadingBool = false;
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

  // add test from course and classes
  addTest() {
    this.addfolder.nativeElement.click();
    this.addmaterial.nativeElement.click();
    let params = {
      "materials_type": 'test',
      "type": 'course',
      'test_id': this.selectedTest.test_id,
      "class_id": this.classId,
    }

    
    this.isLoadingBool = false;
    this.service.post('add-class-Materials', params, 1).subscribe(result => {
      
      this.getMainListing();
      this.isLoadingBool = false;
    })
  }

  // add folder to library
  createTest() {
    this.addfolder.nativeElement.click();
    this.addmaterial.nativeElement.click();
    this.isLoadingBool = false;
    let params = {
      "folder_name": this.libraryData.folder_name,
      "folder_colore": this.libraryData.folder_colore,
      "materials_type": 'folder',
      "type": 'course',
      "class_id": this.classId
    }
    
    this.service.post('add-class-Materials', params, 1).subscribe(result => {
      
      this.getMainListing();
      this.isLoadingBool = false;
    })
  }

  addFile() {
    this.addfolder.nativeElement.click();
    this.addmaterial.nativeElement.click();
    let params = {
      "materials_type": 'file',
      "file_type": this.fileType,
      "attachments_file": this.ExteriorPicString,
      "type": 'course',
      "class_id": this.classId
    }

    
    this.isLoadingBool = false;
    this.service.post('add-class-Materials', params, 1).subscribe(result => {
      this.getMainListing();
      this.isLoadingBool = false;
    })
  }

  picked(event: any) {
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

    this.isLoadingBool = false;
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
    this.isLoadingBool = false;
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
    this.isLoadingBool = false;
    this.service.post('download-libarary-data', params, 1).subscribe(result => {
      this.isLoadingBool = false;
      window.open(result.pdf);
    })
  }
}