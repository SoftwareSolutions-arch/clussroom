import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';

@Component({
  selector: 'app-personal-library',
  templateUrl: './personal-library.component.html',
  styleUrls: ['./personal-library.component.css']
})
export class PersonalLibraryComponent implements OnInit {
  @ViewChild('addtest') private addtest: ElementRef;
  @ViewChild('addfolder') private addfolder: ElementRef;
  @ViewChild('addmaterial') private addmaterial: ElementRef;

  isLoadingBool: boolean = true;
  selectedDataType: any = ''
  constructor(public service: SharedServiceService) {
    this.getPersonalListing();
  }


  ngOnInit(): void {  
  }

  typeData(data) {
    this.selectedDataType = data;
    console.log('data', data);
    $(document).ready(function () {
      $('.slectOne').on('change', function () {
        $('.slectOne').not(this).prop('checked', false);
        $('#result').html($(this).data("id"));
        if ($(this).is(":checked"))
          $('#result').html($(this).data("id"));
        else
          $('#result').html('Empty...!');
      });
    });
  }

  createTest() {
    this.addtest.nativeElement.click();
    this.addfolder.nativeElement.click();
    this.addmaterial.nativeElement.click();
  }

  getPersonalListing() {
    let params = {
      "user_id": "56",
      "type": 'personal'
    }
    console.log('params', params);
    this.isLoadingBool = true;
    this.service.post('vendor_library_listing', params, 1).subscribe(result => {
      this.isLoadingBool = true;
      console.log('vendor_library_listing', result);
    })
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
      this.isLoadingBool = false;
      console.log('add-folder-to-libarary', result);
    })
  }

}