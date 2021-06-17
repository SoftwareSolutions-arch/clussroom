import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';

@Component({
  selector: 'app-main-library',
  templateUrl: './main-library.component.html',
  styleUrls: ['./main-library.component.css']
})
export class MainLibraryComponent implements OnInit {
  @ViewChild('addtest') private addtest: ElementRef;
  @ViewChild('addfolder') private addfolder: ElementRef;
  @ViewChild('addmaterial') private addmaterial: ElementRef;
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

  constructor(public service: SharedServiceService) {
    this.getMainListing();
  }

  ngOnInit(): void {
  }

  getMainListing() {
    let params = {
      "user_id": 56,
      "type": "main"
    }
    console.log('params', params);
    this.isLoadingBool = true;
    this.service.post('vendor_library_listing', params, 1).subscribe(result => {
      this.isLoadingBool = true;
      this.mainLibraryData = result.result;
      console.log('vendor_library_listing', result);
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
    this.service.post('add-folder-to-libarary', this.libraryData, 1).subscribe(result => {
      console.log('result', result);
      this.getMainListing();
      this.isLoadingBool = false;
    })
  }

  setColour(data) {
    this.libraryData.folder_colore = data;
    console.log('data', data);
  }

  createMaterial() {
    // console.log('materialType', this.materialType)
  }


  typeData(data) {
    this.selectedDataType = data;
    console.log('data', data);
  }

}