import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { UtilService } from '../../../providers/util.service';
import { da } from 'date-fns/locale';

@Component({
  selector: 'app-file-transfer',
  templateUrl: './file-transfer.component.html',
  styleUrls: ['./file-transfer.component.css']
})
export class FileTransferComponent implements OnInit {
  userId: any = '';
  isLoadingBool: boolean = true;
  libraryTypeFirst: any = 'main';
  libraryTypeSecond: any = 'personal';
  libraryData: any = [];
  libraryDataSecond: any = [];
  mainLibrary: any = []
  array = []
  constructor(public service: SharedServiceService, public util: UtilService) {
    this.userId = localStorage.getItem('uid');
    this.getMainListing('first');
    this.getMainListing('second');
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>, data) {

    this.array = [];
    this.isLoadingBool = true;
    if (event.previousContainer === event.container) {
      
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.mainLibrary = event.container.data;
      this.mainLibrary.forEach(element => {
        this.array.push(
          {
            'id': element['id'],
            'transfer_library_type': element['library_type'],
            'materials_type': element['file_type']
          }
        )
      });
      let params = {
        'library_data': this.array
      }
      this.service.post('transfer-library-api', params, 1).subscribe(result => {

        this.isLoadingBool = false;
        this.getMainListing('first');
        this.getMainListing('second');
      })
    }
    else {
      
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.mainLibrary = event.container.data;

      if (data == 1) {
        this.mainLibrary.forEach(element => {

          this.array.push(
            {
              'id': element['id'],
              'transfer_library_type': this.libraryTypeFirst,
              'materials_type': element['file_type']
            }
          )
        });
        let params = {
          'library_data': this.array
        }
        this.service.post('transfer-library-api', params, 1).subscribe(result => {

          this.isLoadingBool = false;
          this.getMainListing('first');
          this.getMainListing('second');
        })
      }

      if (data == 2) {
        this.mainLibrary.forEach(element => {
          this.array.push(
            {
              'id': element['id'],
              'transfer_library_type': this.libraryTypeSecond,
              'materials_type': element['file_type']
            }
          )
        });
        let params = {
          'library_data': this.array
        }
        this.service.post('transfer-library-api', params, 1).subscribe(result => {

          this.isLoadingBool = false;
          this.getMainListing('first');
          this.getMainListing('second');
        })
      }

    }
  }

  getMainListing(data) {
    if (this.libraryTypeFirst != this.libraryTypeSecond) {
      if (data == 'first') {
        let params = {
          "user_id": this.userId,
          "type": this.libraryTypeFirst
        }

        this.isLoadingBool = true;
        this.service.post('vendor_library_listing', params, 1).subscribe(result => {
          this.isLoadingBool = false;
          if (result.result.message == "No Data Found") {
            this.util.showSuccessToast(result.result.message);
            this.libraryData = [{}];
          }

          else {
            this.libraryData = result.result;
          }
        })
      }
      else {
        let params = {
          "user_id": this.userId,
          "type": this.libraryTypeSecond
        }

        this.isLoadingBool = true;
        this.service.post('vendor_library_listing', params, 1).subscribe(result => {

          this.isLoadingBool = false;
          if (result.result.message == "No Data Found") {
            this.util.showSuccessToast(result.result.message);
            this.libraryDataSecond = [{}];
          }

          else {
            this.libraryDataSecond = result.result;
          }
        })
      }
    }
    else {
      this.util.showSuccessToast('please select different library')
    }
  }

  itemsMovedIn() {

  }
}
