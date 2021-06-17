import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';

@Component({
  selector: 'app-course-library',
  templateUrl: './course-library.component.html',
  styleUrls: ['./course-library.component.css']
})
export class CourseLibraryComponent implements OnInit {
  library_type = '';
  isLoadingBool: boolean = true;
  libraryData: any = {
    folder_name: '',
    folder_colore: '',
    materials_type: '',
    library_type: ''
  }
  constructor(public service: SharedServiceService) {
    this.getPersonalListing();
  }

  ngOnInit(): void {
  }


  // add folder to library
  addFolderToLibrary() {
    let params = {
      "folder_name": '',
      "folder_colore": '',
      "materials_type": '',
      "library_type": 'course'
    }
    console.log('params', params);
    this.isLoadingBool = true;
    this.service.post('add-folder-to-libarary', params, 1).subscribe(result => {
      this.isLoadingBool = true;
      console.log('add-folder-to-libarary', result);
    })
  }

  // get Personal Listing
  getPersonalListing() {
    let params = {
      "user_id": "56",
      "type": 'course'
    }
    console.log('params', params);
    this.isLoadingBool = true;
    this.service.post('vendor_library_listing', params, 1).subscribe(result => {
      this.isLoadingBool = true;
      console.log('vendor_library_listing', result);
    })
  }
}
